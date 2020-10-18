

export class Cell {
  private value: string;
  private rawValue: string;
  private id: string;

  public readonly row: number;
  public readonly column: string;

  private dependencies: Set<string>;

  public addDependecy(id: string) {
    this.dependencies.add(id);
  }

  public removeDependecy(id: string) {
    this.dependencies.delete(id);
  }

  public clearDependecies() {
    this.dependencies.clear();
  }

  public getDependencies() {
    return this.dependencies;
  }

  public getId() {
    return this.id;
  }

  constructor(row: number, column: string, id: string) {
    this.row = row;
    this.column = column;
    this.id = id;
    this.value = '';
    this.rawValue = '';
    this.dependencies = new Set();
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