import { TableManager } from '../table-manager/TableManager';
import { expect } from 'chai';

import * as Constants from '../table-manager/Constants';

const allowedPrecision = 0.001;

describe('TableManager', () => {

  it('Raw value storage', () => {
    const tableManager = new TableManager();

    tableManager.setCell('a10', 'val1');
    expect(tableManager.getCellValue('a10')).to.equal('val1');

    tableManager.setCell('b13', 'some random data');
    expect(tableManager.getCellValue('b13')).to.equal('some random data');

    tableManager.setCell('a10', 'val2');
    expect(tableManager.getCellValue('a10')).to.equal('val2');
  });

  it('Basic evaluation', () => {
    const tableManager = new TableManager();

    tableManager.setCell('a10', '=5');
    expect(tableManager.getCellValue('a10')).to.equal('5');
    expect(tableManager.getCellRawValue('a10')).to.equal('=5');
  });

  it('Arithmetic evaluation', () => {
    const tableManager = new TableManager();

    tableManager.setCell('a10', '= 5 + 12/4 + 5 mod 3');
    expect(tableManager.getCellValue('a10')).to.equal('10');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5 + 12/4 + 5 mod 3');
  });

  it('Cell reference evaluation', () => {
    const tableManager = new TableManager();

    tableManager.setCell('b10', '= 12');

    tableManager.setCell('a10', '= 5*b10');
    expect(tableManager.getCellValue('a10')).to.equal('60');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');
  });

  it('Empty cell reference evaluation', () => {
    const tableManager = new TableManager();

    tableManager.setCell('b10', '');

    tableManager.setCell('a10', '= 5*b10');
    expect(tableManager.getCellValue('a10')).to.equal('0');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');
  });

  it('Cell reference updates', () => {
    const tableManager = new TableManager();

    tableManager.setCell('b10', '= 12');
    tableManager.setCell('a10', '= 5*b10');
    expect(tableManager.getCellValue('a10')).to.equal('60');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');

    tableManager.setCell('b10', '= 19');
    expect(tableManager.getCellValue('a10')).to.equal('95');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');
  });

  it('Cell reference plaintext numbers', () => {
    const tableManager = new TableManager();

    tableManager.setCell('b10', '12');
    tableManager.setCell('a10', '= 5*b10');
    expect(tableManager.getCellValue('a10')).to.equal('60');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');

    tableManager.setCell('b10', '19');
    expect(tableManager.getCellValue('a10')).to.equal('95');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');
  });

  it('Cell long reference chains', () => {
    const tableManager = new TableManager();

    tableManager.setCell('d2', '12');
    tableManager.setCell('c10', '= 2 * 9 / 5');
    tableManager.setCell('b10', '= c10 + d2');
    tableManager.setCell('aa1', '= b10 * c10 + c10 + d2');

    expect(+tableManager.getCellValue('d2')).to.be.closeTo(12, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(3.6, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(15.6, allowedPrecision);
    expect(+tableManager.getCellValue('aa1')).to.be.closeTo(71.76, allowedPrecision);

    
    tableManager.setCell('d2', '10');
    tableManager.setCell('c10', '= 2 * 9 mod 9');

    expect(+tableManager.getCellValue('d2')).to.be.closeTo(10, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(10, allowedPrecision);
    expect(+tableManager.getCellValue('aa1')).to.be.closeTo(10, allowedPrecision);
  });

  it('Save & load', () => {
    const tableManager = new TableManager();

    tableManager.setCell('b10', '= 12');
    tableManager.setCell('a10', '= 5*b10');
    expect(tableManager.getCellValue('a10')).to.equal('60');
    expect(tableManager.getCellRawValue('a10')).to.equal('= 5*b10');

    const saveText = tableManager.serialize();

    const newTable = TableManager.fromSerialization(saveText);
    
    expect(newTable.getCellValue('a10')).to.equal('60');
    expect(newTable.getCellRawValue('a10')).to.equal('= 5*b10');

  });
});