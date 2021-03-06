import { Cell } from './Cell';
import { FormulaEvaluator } from './FormulaEvaluator';
import * as Constants from './ErrorMessages';
interface CellSerialization {
  row: number,
  column: string,
  id: string,
  rawValue: string,
  key: string
}

interface TableSerialization {
  cells: Array<CellSerialization>
}

interface ValuesObject {
  [key: string]: string
}

const cellRegex = /([a-zA-Z]+)([0-9]+)/;

export class TableManager {
  public static fromSerialization(serialization: string): TableManager {
    const tableManager = new TableManager();

    const obj = JSON.parse(serialization);
    if(!obj || !obj.cells) {
      throw new Error(Constants.INVALID_SERIALIZATION);
    }

    const tableSerializationObject = obj as TableSerialization;

    tableSerializationObject.cells.forEach((cell) => {
      const tableCell = new Cell(cell.row, cell.column, cell.id);

      tableManager.values.set(cell.key, tableCell);

      tableManager.setCell(cell.id, cell.rawValue);
    });

    return tableManager;
  }

  public serialize(): string {
    const cells: Array<CellSerialization> = [];

    this.values.forEach((cell, key) => {
      cells.push({
        rawValue: cell.getRawValue(),
        row: cell.getRow(),
        column: cell.getColumn(),
        id: cell.getId(),
        key: key
      });
    });

    const serializationObj: TableSerialization =  {
      cells
    };

    return JSON.stringify(serializationObj);
  } 

  getCell(cellId: string): Cell {
    const id = cellId.toUpperCase();
    const cell = this.values.get(id);

    if (!cell) {
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
  
  getCellsValuesObject(): ValuesObject {
    const result: ValuesObject = {};

    this.values.forEach((cell, key) => {
      result[key] = cell.getValue();
    });

    return result;
  }

  getCellValue(id: string): string {
    return this.getCell(id).getValue();
  }

  getCellRawValue(id: string): string {
    return this.getCell(id).getRawValue();
  }

  setCell(cellId: string, value: string) {
    const id = cellId.toUpperCase();
    this.setIndividualCell(id, value);
    this.updateAllCells();
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
      cell.clearDependecies();
      const formula = value.trim();

      if(formula.trim() !== '' && isFinite(+formula) && formula.length > 5) {
        cell.setValue((+formula).toFixed(2));
      } else {
        cell.setValue(formula.trim());
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
    const evaluatedValue = this.evaluator.evaluate(
      formula,
      (variable: string) => {
        const varCell = this.getCell(variable);

        cell.addDependecy(varCell.getId());

        const value = varCell.getValue();
        if(!isFinite(+value) 
            && varCell.getId() !== cellId
            && varCell.getRawValue() !== value
          ) {
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
    return evaluatedValue;
  }

  constructor() {
    this.values = new Map();
    this.evaluator = new FormulaEvaluator();
  } 

  private values: Map<string, Cell>;
  private evaluator: FormulaEvaluator;
}
