"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var FileManager_1 = require("./FileManager");
var mainWindow;
var fileManager;
var menuTemplate = [
    {
        label: 'Файл',
        submenu: [
            {
                label: 'Зберегти як...',
                click: function () {
                    fileManager.saveTable();
                }
            },
            {
                label: 'Відкрити...',
                click: function () {
                    fileManager.loadTable();
                }
            },
            {
                label: 'Закрити вікно',
                click: function () {
                    mainWindow.close();
                }
            }
        ]
    }
];
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({ width: 900, height: 680, webPreferences: {
            nodeIntegration: true
        } });
    fileManager = new FileManager_1.FileManager(mainWindow);
    mainWindow.loadURL(isDev
        ? "http://localhost:3000"
        : "file://" + path.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return (mainWindow.destroy()); });
    var menu = electron_1.Menu.buildFromTemplate(menuTemplate);
    electron_1.Menu.setApplicationMenu(menu);
    electron_1.ipcMain.on('error', function (event, msg) {
        electron_1.dialog.showErrorBox('Error', msg);
    });
}
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});
