import { Cell } from './Cell';
import { FormulaEvaluator } from './FormulaEvaluator';
import { TouchBarScrubber } from 'electron';
import { constants } from 'os';
import * as Constants from './Constants';
import { cursorTo } from 'readline';

export class TableManager {

  private values: Map<string, Cell>;
  private evaluator: FormulaEvaluator;

  getCell(id: string): Cell {
    const cell = this.values.get(id);

    if (!cell) {
      const cellRegex = /([a-zA-Z]+)([0-9]+)/;
      const regResult = cellRegex.exec(id);

      if (!regResult) {
        throw new Error(Constants.INVALID_CELL);
      }

      const column = regResult[1];
      const row = regResult[2];


      const newCell = new Cell(+row, column, id);

      this.values.set(id, newCell);

      return newCell;
    }

    return cell;
  }
  
  getCellValue(id: string): string {
    return this.getCell(id).getValue();
  }

  getCellRawValue(id: string): string {
    return this.getCell(id).getRawValue();
  }

  private updateAllCells() {
    let changesFound;
    do{
      changesFound = false;

      this.values.forEach((cell: Cell, key: string) => {
        const prevValue = cell.getValue();

        // setCell can be called to make sure that the cell value changed
        const rawValue = cell.getRawValue();
        this.setIndividualCell(key, rawValue);

        const newValue = cell.getValue();
        if (prevValue != newValue) {
          changesFound = true;
        }
      });

    } while(changesFound);
  }

  /// Sets the value of a cell without updating all other cells
  private setIndividualCell(cellId: string, value: string) {
    const cell = this.getCell(cellId);

    cell.setRawValue(value);

    const plainTextMode = !value.startsWith('=');

    if (plainTextMode) {
      const formula = value;
      const newValue = this.evaluateCell(cell, formula);

      if(isFinite(+newValue) && newValue.length > 5) {
        cell.setValue((+newValue).toFixed(2));
      } else if (isFinite(+newValue)) {
        cell.setValue(newValue);
      } else {
        cell.setValue(value);
      }
    } else {
      const formula = value.slice(1);
      const newValue = this.evaluateCell(cell, formula);

      if(isFinite(+newValue) && newValue.length > 5) {
        cell.setValue((+newValue).toFixed(2));
      }

      cell.setValue(newValue);
    }
  }

  setCell(cellId: string, value: string) {
    this.setIndividualCell(cellId, value);
    this.updateAllCells();
  }

  private checkCycle(cell: Cell, rootCellId: string, depth: number = 1) {
    // depth is just a backup variable, in case the recursion goes too deep
    if (cell.getId().trim() === rootCellId.trim() || depth > 5000) {
      throw new Error(Constants.CYCLIC_DEPENDENCY);
    }

    const deps = cell.getDependencies();

    deps.forEach((dep) => {
      const depCell = this.getCell(dep);
      this.checkCycle(depCell, rootCellId, depth + 1);
    });
  }

  private evaluateCell(cell: Cell, formula: string): string {
    cell.clearDependecies();

    const cellId = cell.getId();
    const regex = /[a-zA-z]+[0-9]+/;
    const evaluatedValue = this.evaluator.evaluate(
      formula,
      (variable: string) => {

        const varCell = this.getCell(variable);

        cell.addDependecy(varCell.getId());

        const value = varCell.getValue();
        if(!isFinite(+value) && varCell.getId() !== cellId) {
          return '0';
        }

        try {
        // Will throw an exception if a cycle is detected
          this.checkCycle(varCell, cellId);
        } catch(err) {
          cell.clearDependecies();
          throw err;
        }
        return value;
      }
    )


    /// 1. Parse the formula, get list of deps 
    /// 2. DFS dependecies
    /// 3. Evaluate with visitor 

    return evaluatedValue;
  }

  // public getRows() {
  //   return this.rows;
  // }

  // public getColumns() {
  //   return this.columns;
  // }

  constructor() {
    this.values = new Map();
    this.evaluator = new FormulaEvaluator();

    // this.initCells(rows, columns);
  }

}
