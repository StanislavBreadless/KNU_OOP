import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';
import { FILE_REQUEST_MSG, FILE_RESPONSE_MSG, TRANSFORM_CALL } from './constants';

import { DOMImplementation, DOMParser, XMLSerializer } from 'xmldom';
import { install, xsltProcess } from 'xslt-ts';

install(new DOMParser(), new XMLSerializer(), new DOMImplementation())

let mainWindow : BrowserWindow ;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 ,  webPreferences : {
        nodeIntegration: true,
      } });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow.destroy()));

 
    mainWindow.setMenu(null);

    ipcMain.on('error', (event : IpcMessageEvent , msg: string)=>{
        dialog.showErrorBox('Error', msg);
    })

    ipcMain.on(FILE_REQUEST_MSG, (event: any) => {
      //console.log(`${path.join(__dirname, "./data.xml")}`);
      fs.readFile(`${path.join(__dirname, "../data.xml")}`, (err, data) => {
        if(err) { 
          throw err;
        } else {
          const dataStr = data.toString();
          event.sender.send(FILE_RESPONSE_MSG, dataStr);
        }
      });
    }); 

    ipcMain.on(TRANSFORM_CALL, () => {
      fs.readFile(`${path.join(__dirname, "../data.xml")}`, (err, data) => {
        if(err) { 
          throw err;
        } else {
          const xlst = fs.readFileSync(`${path.join(__dirname, "../stylesheet.xsl")}`);
          const parser = new DOMParser();
          const newData = xsltProcess(
            parser.parseFromString(data.toString()), 
            parser.parseFromString(xlst.toString())
          )

          dialog.showSaveDialog(mainWindow, {
            filters: [{
              name: 'HTML files',
              extensions: ['.html']
            }]
          },(filename) => {
            if(!filename) {
              return;
            }
            fs.writeFileSync(`${filename}`, newData);
          })
          
        } 
      });
    });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});