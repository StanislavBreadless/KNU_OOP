
import React from 'react';

import { getNextKey } from '../../helpers/utils';

import { TableManager } from '../../table-manager/TableManager';

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

const tRow = (
  colNumber: number, 
  id: number,
  localState: any,
  updateLocalState: (id: string, value: string) => any,
  inputFunction: (id: string, value: string) => any
) => {
  const cell = 'cell';
  const cells: Array<React.ReactElement> = [<td className={cell} key={-1}>{id}</td>];

  let key = 'A';
  for(let i = 0; i < colNumber; key = getNextKey(key), i++) {
    // if(i == 0 && id == 0) {
    //   console.log(key);
    //   console.log('Rerender!!!!');
    //   console.log(manager.getCellValue('A0'));
    // }
    const currentId = key + id;
    cells.push((
      <td className={cell} key={currentId}>
        <input 
          className='cell-input'
          onChange={(e) => {
            updateLocalState(currentId, e.target.value);
          }}
          onBlur={() => {inputFunction(currentId, localState[currentId]||'');}}
          value={localState[currentId] || ''}
        ></input>
      </td>
    ))
  }

  return (
    <tr key={id}>
      {cells}
    </tr>
  );
}



const tBody = (
  colNumber: number, 
  rowNumber: number,
  localState: any,
  updateLocalState: (id: string, value: string) => any,
  inputFunction: (id: string, value: string) => any
) => {
  const rows: Array<React.ReactElement> = [];

  for(let i = 0; i < rowNumber; i++) {
    rows.push(tRow(colNumber, i, localState, updateLocalState, inputFunction));
  }

  return rows;
}

class StaticTable extends React.Component<StaticTableProps> {
  private tableManager: TableManager;
  constructor(props: StaticTableProps) {
    super(props);

    this.state = {};
    this.tableManager = new TableManager();
    // this.updateState = this.updateState.bind(this);
    this.setInput = this.setInput.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);
  }

  updateLocalState(id: string, value: string) {
    console.log('Updating: ', id, value);
    this.setState({
      [id]: value
    });
  }

  applyTableChanges() {
    this.setState(this.tableManager.getCellsValuesObject());
  }

  setInput(id: string, value: string) {
    console.log(id, value);
    this.tableManager.setCell(id, value);
    console.log(this.tableManager.getCellValue(id));
    this.applyTableChanges();
  }

  render() {
    console.log('Render'!!);
    const {colNumber, rowNumber} = this.props;

    const headCells = tHead(colNumber);
    const bodyCells = tBody(
      colNumber, 
      rowNumber, 
      this.state, 
      this.updateLocalState, 
      this.setInput
    );

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