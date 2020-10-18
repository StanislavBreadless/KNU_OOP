import { TableManager } from '../table-manager/TableManager';
import { expect } from 'chai';

import * as Constants from '../table-manager/Constants';

const allowedPrecision = 0.001;

describe('Error handling in TableManager', () => {

  it('Self-cycle detection', () => {
    const tableManager = new TableManager();

    tableManager.setCell('d10', '= d10');

    const error = new Error(Constants.CYCLIC_DEPENDENCY);

    expect(tableManager.getCellValue('d10')).to.equal(error.toString());
  });

  it('No cycle detection in plaintext mode', () => {
    const tableManager = new TableManager();

    tableManager.setCell('a10', 'a10');

    expect(tableManager.getCellValue('a10')).to.equal('a10');
  });

  it('Long cycle detection', () => {
    const tableManager = new TableManager();

    tableManager.setCell('d10', '= a10');
    tableManager.setCell('c10', '= d10');
    tableManager.setCell('b10', '= c10');
    tableManager.setCell('a10', '= b10');

    expect(+tableManager.getCellValue('d10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(0, allowedPrecision);

    const error = new Error(Constants.CYCLIC_DEPENDENCY);

    expect(tableManager.getCellValue('a10')).to.equal(error.toString());
  });

  it('Cycle detection and recovery', () => {
    const tableManager = new TableManager();

    tableManager.setCell('d10', '= a10');
    tableManager.setCell('c10', '= d10');
    tableManager.setCell('b10', '= c10');
    tableManager.setCell('a10', '= b10');

    expect(+tableManager.getCellValue('d10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(0, allowedPrecision);

    const error = new Error(Constants.CYCLIC_DEPENDENCY);

    expect(tableManager.getCellValue('a10')).to.equal(error.toString());

    // Now let's break the cycle by taking away reference from d10 to a10!
    tableManager.setCell('d10', '= 19');
    expect(+tableManager.getCellValue('d10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('a10')).to.be.closeTo(19, allowedPrecision);
  });

  it('Cycle detection and recovery: no = sign', () => {
    const tableManager = new TableManager();

    tableManager.setCell('d10', '= a10');
    tableManager.setCell('c10', '= d10');
    tableManager.setCell('b10', '= c10');
    tableManager.setCell('a10', '= b10');

    expect(+tableManager.getCellValue('d10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(0, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(0, allowedPrecision);

    const error = new Error(Constants.CYCLIC_DEPENDENCY);

    expect(tableManager.getCellValue('a10')).to.equal(error.toString());

    // Now let's break the cycle by taking away reference from d10 to a10!
    tableManager.setCell('d10', '19');
    expect(+tableManager.getCellValue('d10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('c10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('b10')).to.be.closeTo(19, allowedPrecision);
    expect(+tableManager.getCellValue('a10')).to.be.closeTo(19, allowedPrecision);
  });

});