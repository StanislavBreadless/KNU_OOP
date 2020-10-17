

export class Cell {
  private value: string;
  private rawValue: string;

  public readonly row: number;
  public readonly column: string;

  constructor(row: number, column: string) {
    this.row = row;
    this.column = column;
    this.value = '';
    this.rawValue = '';
  }

  public setValue(newValue: string) {
    this.value = newValue;
  }
  public getValue() {
    return this.value;
  }

  public setRawValue(newValue: string) {
    this.rawValue = newValue;
  }
  public getRawValue() {
    return this.rawValue;
  }
}