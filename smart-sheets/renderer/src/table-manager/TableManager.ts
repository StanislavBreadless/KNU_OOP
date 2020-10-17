import { Cell } from './Cell';
import { FormulaEvaluator } from './FormulaEvaluator';

export class TableManager {

  private values: Map<Cell, string>;
  // private evaluator: FormulaEvaluator;

  getCell(cell: Cell): string {
    return this.values.get(cell) || '';
  } 

  setCell(cell: Cell, value: string) {
    cell.setRawValue(value);

    const plainTextMode = value.startsWith('=');

    if (plainTextMode) {
      cell.setValue(value);
    } else {
      const formula = value.slice(1);
      cell.setValue(this.evaluateCell(cell, formula));
    }
  }

  private evaluateCell(cell: Cell, formula: string): string {
    /// 1. Parse the formula, get list of deps 
    /// 2. DFS dependecies
    /// 3. Evaluate with visitor 

    return '';
  }

  constructor() {
    this.values = new Map();
    // this.evaluator = new FormulaEvaluator();
  }

}
