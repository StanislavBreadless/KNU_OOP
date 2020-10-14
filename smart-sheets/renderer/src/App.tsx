import React from 'react';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import StaticTable from './components/StaticTable/StaticTable';
const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

ipcRenderer.on('response' , (event:IpcMessageEvent , args:any)=>{
  console.log(args);
})


const App: React.FC = () => {
  return (
    <div className="App">
      <StaticTable 
        colNumber={26} 
        rowNumber={26} 
      />
    </div>
  
  );
}

export default App;
