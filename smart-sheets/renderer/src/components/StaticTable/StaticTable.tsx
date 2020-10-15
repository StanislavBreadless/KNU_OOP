
import React from 'react';

import { getNextKey } from '../../helpers/utils';

import './StaticTable.css';

type StaticTableProps = {
  colNumber: number,
  rowNumber: number
}

const tHead = (colNumber: number) => {
  const headCell = 'cell head-cell';
  const cells: Array<React.ReactElement> = [<th className={headCell} key={-1}></th>];

  let key = 'A';
  for(let i = 0; i < colNumber; key = getNextKey(key), i++) {
    cells.push(<th className={headCell} key={key}>{key}</th>)
  }

  return (
    <tr>
      {cells}
    </tr>
  );
};

const tRow = (colNumber: number, id: number) => {
  const cell = 'cell';
  const cells: Array<React.ReactElement> = [<td className={cell} key={-1}>{id}</td>];

  for(let i = 0; i < colNumber; i++) {
    cells.push((
      <td className={cell} key={i}>
        <input className='cell-input'></input>
      </td>
    ))
  }

  return (
    <tr>
      {cells}
    </tr>
  );
}

const tBody = (colNumber: number, rowNumber: number) => {
  const rows: Array<React.ReactElement> = [];

  for(let i = 0; i < rowNumber; i++) {
    rows.push(tRow(colNumber, i));
  }

  return rows;
}

class StaticTable extends React.Component<StaticTableProps> {

  render() {
    const {colNumber, rowNumber} = this.props;

    const headCells = tHead(colNumber);
    const bodyCells = tBody(colNumber, rowNumber);

    return (
      <table className='main-table'>
        <thead>
          {headCells}
        </thead>
        <tbody>
          {bodyCells}
        </tbody>
      </table>
    );  
  }
}

export default StaticTable;