import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';
import { FILE_REQUEST_MSG, FILE_RESPONSE_MSG } from './constants';
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
      console.log(`${path.join(__dirname, "./data.xml")}`);
      fs.readFile(`${path.join(__dirname, "../data.xml")}`, (err, data) => {
        if(err) { 
          throw err;
        } else {
          const dataStr = data.toString();
          event.sender.send(FILE_RESPONSE_MSG, dataStr);
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