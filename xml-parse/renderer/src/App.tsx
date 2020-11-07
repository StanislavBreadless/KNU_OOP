import React from 'react';
import { IpcRenderer, IpcMessageEvent} from 'electron' ; 
import TableGUI from './components/StaticTable/TableGUI';
import * as Constants from './constants/constants';
import { DOMImplementation, DOMParser, XMLSerializer } from 'xmldom';
import { install, xsltProcess, getParser } from 'xslt-ts';

/* @ts-ignore */
import * as xml from 'sax-parser';

const electron  = window.require('electron') ;  // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer : IpcRenderer  = electron.ipcRenderer ; 

ipcRenderer.on('response' , (event:IpcMessageEvent , args:any)=>{
  console.log(args);
})


const dumberFunction = () => {
  
  var parser = new xml.SaxParser(function(cb) {
    cb.onStartDocument(function() {});
    cb.onEndDocument(function() {});
    cb.onStartElementNS(function(elem, attrs, prefix, uri, namespaces) {
      alert(
        "=> Started: " +
          elem +
          " uri=" +
          uri +
          " (Attributes: " +
          JSON.stringify(attrs) +
          " )"
      );
    });
    cb.onEndElementNS(function(elem, prefix, uri) {
      alert("<= End: " + elem + " uri=" + uri + "\n");
      parser.pause(); // pause the parser
      setTimeout(function() {
        parser.resume();
      }, 100); //resume the parser
    });
    cb.onCharacters(function(chars) {
      console.log("<CHARS>" + chars + "</CHARS>");
    });
    cb.onCdata(function(cdata) {
      console.log("<CDATA>" + cdata + "</CDATA>");
    });
    cb.onComment(function(msg) {
      console.log("<COMMENT>" + msg + "</COMMENT>");
    });
    cb.onWarning(function(msg) {
      console.log("<WARNING>" + msg + "</WARNING>");
    });
    cb.onError(function(msg) {
      console.log("<ERROR>" + JSON.stringify(msg) + "</ERROR>");
    });
  });
   
  //example read from chunks
  parser.parseString("<html><body>");
  parser.parseString("<!-- This is the start");
  parser.parseString("</body");
  parser.parseString("></html>");
};

const dumbFunction = () => {

  const xmlString = `
  <?xml version="1.0" encoding="UTF-8"?>
  <note>
    <to>Tove</to>
    <from>Jani</from>
    <heading>Reminder</heading>
    <body>Don't forget me this weekend!</body>
  </note>  
  `;

  const xsltString = `
    
<?xml version="1.0"?>

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <body>
    <h2>My CD Collection</h2>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th>Title</th>
        <th>Artist</th>
      </tr>
      <xsl:for-each select="note">
        <tr>
          <td><xsl:value-of select="to"/></td>
          <td><xsl:value-of select="from"/></td>
        </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
  
  `;


  const parser = new DOMParser();
  // xmlString: string of xml file contents
  // xsltString: string of xslt file contents
  // outXmlString: output xml string.
  install(new DOMParser(), new XMLSerializer(), new DOMImplementation());
  const outXmlString = xsltProcess(parser.parseFromString(xmlString), parser.parseFromString(xsltString));
}


const App: React.FC = () => {

  dumberFunction();

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
