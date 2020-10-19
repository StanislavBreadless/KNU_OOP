import { BrowserWindow , app , ipcMain, IpcMessageEvent, Menu, dialog, ipcRenderer } from 'electron' ; 
import * as isDev from "electron-is-dev" ; 
import * as path from 'path'
import * as fs from 'fs';

let mainWindow : BrowserWindow ;

const saveFile = (text: string) => {
  const filePath = dialog.showSaveDialog(mainWindow, {});
  if(!filePath) {
    return;
  }

  fs.writeFile(filePath, text, (err) => {
    if(err) {
      dialog.showErrorBox('Failed saving file', err.message);
    }
    dialog.showMessageBox(mainWindow, {
      title: 'Saving file',
      message: 'File saved successfuly!'
    }, () => {});
  });
};

const openFile = () => {

} 

let saveTableLock = false;
const saveTable = () => {
  if(saveTableLock) {
    return;
  }
  saveTableLock = true;
  mainWindow.webContents.send('save-data');

  ipcMain.on('save-data', (event: IpcMessageEvent, msg: string) => {
    saveFile(msg);
    saveTableLock = false;
  });
}

const menuTemplate = [
  {
    label: 'Файл',
    submenu: [
      {
        label: 'Зберегти ...',
        click() {
          saveTable();
        }   
      },
      {
        label: 'Відкрити ...'
      },
      {
        label: 'Закрити',
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