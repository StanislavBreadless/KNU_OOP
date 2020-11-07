import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';
import { FileManager } from './FileManager';

let mainWindow : BrowserWindow ;
let fileManager: FileManager;

const menuTemplate = [
  {
    label: 'Файл',
    submenu: [
      {
        label: 'Зберегти як...',
        click() {
          fileManager.saveTable();
        }   
      },
      {
        label: 'Відкрити...',
        click() {
          fileManager.loadTable();
        }
      },
      {
        label: 'Закрити вікно',
        click() {
          mainWindow.close();
        }
      }
    ]
  }
];

function createWindow() {
    mainWindow = new BrowserWindow({ width: 900, height: 680 ,  webPreferences : {
        nodeIntegration: true,
      } });
    fileManager = new FileManager(mainWindow);
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow.destroy()));

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    ipcMain.on('error', (event : IpcMessageEvent , msg: string)=>{
        dialog.showErrorBox('Error', msg);
    })
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