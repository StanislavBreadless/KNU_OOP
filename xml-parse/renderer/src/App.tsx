import React, { useEffect, useRef, useState } from 'react';
import { IpcRenderer, IpcMessageEvent, Data} from 'electron' ; 
import { DataList } from './components/DataList';
import { OptionsForm } from './components/OptionsForm';

import { DataService } from './data-service/dataService';

import { DomXMLParser } from './xml-parsers/DomXMLParser';
import { SaxXMLParser } from './xml-parsers/SaxXMLParser';
import { DataSearchFilters, ParserType, PersonData } from './types';

import { FILE_REQUEST_MSG, FILE_RESPONSE_MSG} from './constants/constants';

/* @ts-ignore */
import * as xml from 'sax-parser';
import { transcode } from 'buffer';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 



const DOMParser = new DomXMLParser();
const SaxParser = new SaxXMLParser();

const App: React.FC = () => {
  const serviceRef = useRef<DataService>(new DataService(DOMParser));
  const [data, setData] = useState<PersonData[]>([]);
  const [dataString, setDataString] = useState('');

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

  const setDataStr = (dataStr: string) => {
    setData(serviceRef.current.getData(dataStr, {}));   
    setDataString(dataStr);
  }

  const registerIpc = () => {
    ipcRenderer.send(FILE_REQUEST_MSG);

    ipcRenderer.on(FILE_RESPONSE_MSG, (event, args) => {
      setDataStr(args as string);
    });
  }

  useEffect(() => {
    registerIpc();
  }, []);

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
