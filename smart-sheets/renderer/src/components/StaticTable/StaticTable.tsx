
import React from 'react';

import { getNextKey } from '../../helpers/utils';

import { TableManager } from '../../table-manager/TableManager';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import './StaticTable.css';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 


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
  startEdit: (id: string)=>any, 
  inputFunction: (id: string, value: string) => any
) => {
  const cell = 'cell';
  const cells: Array<React.ReactElement> = [<td className={cell} key={-1}>{id}</td>];

  let key = 'A';
  for(let i = 0; i < colNumber; key = getNextKey(key), i++) {
    const currentId = key + id;
    cells.push((
      <td 
        className={cell} 
        key={currentId}
      >
        <input 
          className='cell-input'
          onChange={(e) => {
            updateLocalState(currentId, e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.currentTarget.blur();
            }
          }}
          onBlur={() => {inputFunction(currentId, localState[currentId]||'');}}
          onFocus={() => {startEdit(currentId)}}
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
  startEdit: (id: string)=>any,
  inputFunction: (id: string, value: string) => any
) => {
  const rows: Array<React.ReactElement> = [];

  for(let i = 0; i < rowNumber; i++) {
    rows.push(tRow(colNumber, i, localState, updateLocalState, startEdit, inputFunction));
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
    this.startEdit = this.startEdit.bind(this);

    
    ipcRenderer.on('save-data', () => {
      ipcRenderer.send('save-data', this.tableManager.serialize());
    });

  }

  updateLocalState(id: string, value: string) {
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

  startEdit(id: string) {
    const rawValue = this.tableManager.getCellRawValue(id);

    this.setState({
      [id]: rawValue
    });
  }

  render() {
    const {colNumber, rowNumber} = this.props;

    const headCells = tHead(colNumber);
    const bodyCells = tBody(
      colNumber, 
      rowNumber, 
      this.state, 
      this.updateLocalState, 
      this.startEdit,
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