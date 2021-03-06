import React from 'react';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import TableGUI from './components/StaticTable/TableGUI';
import * as Constants from './constants/constants';
const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

ipcRenderer.on('response' , (event:IpcMessageEvent , args:any)=>{
  console.log(args);
})


const App: React.FC = () => {
  return (
    <div className="App">
      <div className="table-wrapper">
        <TableGUI 
          colNumber={Constants.TABLE_WIDTH} 
          rowNumber={Constants.TABLE_HEIGHT} 
        />
      </div>
    </div>
  
  );
}

export default App;
