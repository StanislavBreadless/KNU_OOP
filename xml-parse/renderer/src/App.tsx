import React, { useEffect, useRef, useState } from 'react';
import { IpcRenderer, IpcMessageEvent, Data} from 'electron' ; 
import { DataList } from './components/DataList';
import { OptionsForm } from './components/OptionsForm';

import { DataService } from './data-service/dataService';

import { DomXMLParser } from './xml-parsers/DomXMLParser';
import { SaxXMLParser } from './xml-parsers/SaxXMLParser';
import { DataSearchFilters, ParserType, PersonData } from './types';

/* @ts-ignore */
import * as xml from 'sax-parser';
import { transcode } from 'buffer';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

ipcRenderer.on('response' , (event:IpcMessageEvent , args:any)=>{
  console.log(args);
})

const DOMParser = new DomXMLParser();
const SaxParser = new SaxXMLParser();

const App: React.FC = () => {
  const serviceRef = useRef<DataService>(new DataService(DOMParser));
  const [data, setData] = useState<PersonData[]>([]);

  const setParser = (type: "SAX"|"DOM") => {
    if(type === 'DOM') {
      serviceRef.current.setParser(DOMParser);
    } else {
      serviceRef.current.setParser(SaxParser);
    }
  }

  const search = (filters: DataSearchFilters) => {

  }

  const transform = () => {

  }

  const clear = () => {

  }

  return (
    <div className="App">
      <div className="app-wrapper">
        <OptionsForm 
          setParser={setParser}
          search={search}
          transform={transform}
          clear={clear}
        />
        <DataList 
          data={data}
        />
      </div>
    </div>
  
  );
}

export default App;
