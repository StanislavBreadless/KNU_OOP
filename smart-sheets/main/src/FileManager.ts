import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';

export class FileManager {

  // Used to prevent double-calling same event
  private operationsCounter: number;
  private operationLock: boolean;
  private readonly fileFilters = [{
    name: 'JSON file',
    extensions: ['json']
  }];

  constructor(private mainWindow: BrowserWindow) {
    this.operationsCounter = 0;
    this.operationLock = false;
  }

  private saveFile(text: string) {
    const filePath = dialog.showSaveDialog(this.mainWindow, {
      filters: this.fileFilters
    });
    if(!filePath) {
      return;
    }
  
    fs.writeFileSync(filePath, text);
  };

  saveTable() { 
    if(this.operationLock) {
      return;
    }
    this.operationLock = true;
  
    this.mainWindow.webContents.send('save-data');

    const currentOp = this.operationsCounter;
    ipcMain.on('save-data', (event: IpcMessageEvent, msg: string) => {
      if(currentOp !== this.operationsCounter) {
        return;
      }
      this.saveFile(msg);
      this.operationLock = false;
      this.operationsCounter++;
    });
  } 

  loadTable() {
    if(this.operationLock) {
      return;
    }
    this.operationLock = true;
  
    const filePath = dialog.showOpenDialog(this.mainWindow, {
      filters: this.fileFilters
    });
    if(!filePath) {
      this.operationLock = true;
      return;
    }
  
    fs.readFile(filePath[0], {}, (err, data) => {
      if(err) {
        dialog.showErrorBox('Failed to open file', err.message);
        this.operationLock = false;
        return;
      }
  
      this.mainWindow.webContents.send('load-data', data.toString());
      this.operationLock = false;
    });
  }
}