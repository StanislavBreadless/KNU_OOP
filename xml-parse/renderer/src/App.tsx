import React from 'react';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 

/* @ts-ignore */
import * as xml from 'sax-parser';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

ipcRenderer.on('response' , (event:IpcMessageEvent , args:any)=>{
  console.log(args);
})


const App: React.FC = () => {
  return (
    <div className="App">
      <div className="app-wrapper">
        
      </div>
    </div>
  
  );
}

export default App;
