import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog, ipcRenderer } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';

let mainWindow : BrowserWindow ;

let operationsCounter = 0;

const saveFile = (text: string) => {
  const filePath = dialog.showSaveDialog(mainWindow, {});
  if(!filePath) {
    return;
  }

  fs.writeFileSync(filePath, text);
};


let saveTableLock = false;
const saveTable = () => {
  if(saveTableLock) {
    return;
  }
  console.log('Arrived');
  saveTableLock = true;
  mainWindow.webContents.send('save-data');

  const currentOp = operationsCounter;

  ipcMain.on('save-data', (event: IpcMessageEvent, msg: string) => {
    if(currentOp !== operationsCounter) {
      return;
    }
    console.log('save-data event');
    saveFile(msg);
    saveTableLock = false;
    operationsCounter++;
  });
}

let openFileLock = false;
const openTable = () => {
  if(openFileLock) {
    return;
  }
  openFileLock = true;

  const filePath = dialog.showOpenDialog(mainWindow, {});
  if(!filePath) {
    openFileLock = true;
    return;
  }

  fs.readFile(filePath[0], {}, (err, data) => {
    if(err) {
      dialog.showErrorBox('Failed to open file', err.message);
      openFileLock = false;
      return;
    }

    mainWindow.webContents.send('load-data', data.toString());
    openFileLock = false;
  });
}

const menuTemplate = [
  {
    label: 'Файл',
    submenu: [
      {
        label: 'Зберегти як...',
        click() {
          saveTable();
        }   
      },
      {
        label: 'Відкрити...',
        click() {
          openTable();
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
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow.destroy()));

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    ipcMain.on('channel' , (event : IpcMessageEvent , msg: string)=>{
        
    })

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