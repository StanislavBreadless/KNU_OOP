
import React from 'react';

import { getNextKey } from '../../helpers/utils';

import { TableManager } from '../../table-manager/TableManager';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import './StaticTable.css';
import { couldStartTrivia } from 'typescript';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 


interface ITableGUIProps {
  colNumber: number,
  rowNumber: number
}

interface ITableGUIState {
  [key: string]: string
}

class TableGUI extends React.Component<ITableGUIProps, ITableGUIState> {
  private tableManager: TableManager;

  private tHead(colNumber: number) {
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

  private tRow(
    colNumber: number, 
    id: number
  ) {
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
              this.updateLocalState(currentId, e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.currentTarget.blur();
              }
            }}
            onBlur={() => {this.setInput(currentId, this.state[currentId]||'');}}
            onFocus={() => {this.startEdit(currentId)}}
            value={this.state[currentId] || ''}
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

  
  private tBody (
    colNumber: number, 
    rowNumber: number,
  ) {
    const rows: Array<React.ReactElement> = [];

    for(let i = 0; i < rowNumber; i++) {
      rows.push(this.tRow(colNumber, i));
    }

    return rows;
  }

  constructor(props: ITableGUIProps) {
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

    ipcRenderer.on('load-data', (event: IpcMessageEvent, data: string) => {
      try{
        const newManager = TableManager.fromSerialization(data);
        if(!newManager) {
          throw new Error('Failed to parse file');
        }

        this.tableManager = newManager;
        this.resetState();
        this.applyTableChanges();
      } catch(err)  {
        ipcRenderer.send('error', err.message);
      } 

    });

  }

  updateLocalState(id: string, value: string) {
    this.setState({
      [id]: value
    });
  }

  resetState() {
    const newState = {...this.state};
    Object.keys(newState).forEach((key) => {
      // @ts-ignore
      newState[key] = undefined;
    });
    this.setState(newState);
  }

  applyTableChanges() {
    this.setState(this.tableManager.getCellsValuesObject());
  }

  setInput(id: string, value: string) {
    this.tableManager.setCell(id, value);
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

    const headCells = this.tHead(colNumber);
    const bodyCells = this.tBody(
      colNumber, 
      rowNumber
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

export default TableGUI;