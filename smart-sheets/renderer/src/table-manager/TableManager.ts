import { Cell } from './Cell';
import { FormulaEvaluator } from './FormulaEvaluator';
import { INVALID_CELL } from './Constants';
import { TouchBarScrubber } from 'electron';

export class TableManager {

  private values: Map<string, Cell>;
  private evaluator: FormulaEvaluator;

  getCell(id: string): Cell {
    const cell = this.values.get(id);

    if (!cell) {
      const cellRegex = /([a-zA-Z]+)([0-9]+)/;
      const regResult = cellRegex.exec(id);

      if (!regResult) {
        throw new Error(INVALID_CELL);
      }

      const column = regResult[1];
      const row = regResult[2];


      const newCell = new Cell(+row, column);

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

    }while(changesFound);
  }

  /// Sets the value of a cell without updating all other cells
  private setIndividualCell(cellId: string, value: string) {
    const cell = this.getCell(cellId);

    cell.setRawValue(value);

    const plainTextMode = !value.startsWith('=');

    if (plainTextMode) {
      cell.setValue(value);
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

  private evaluateCell(cell: Cell, formula: string): string {
    const regex = /[a-zA-z]+[0-9]+/;
    const evaluatedValue = this.evaluator.evaluate(
      formula,
      (variable: string) => {
        return this.getCell(variable).getValue();
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
