"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var isDev = require("electron-is-dev");
var path = require("path");
var fs = require("fs");
var constants_1 = require("./constants");
var xmldom_1 = require("xmldom");
var xslt_ts_1 = require("xslt-ts");
xslt_ts_1.install(new xmldom_1.DOMParser(), new xmldom_1.XMLSerializer(), new xmldom_1.DOMImplementation());
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({ width: 900, height: 680, webPreferences: {
            nodeIntegration: true
        } });
    mainWindow.loadURL(isDev
        ? "http://localhost:3000"
        : "file://" + path.join(__dirname, "../build/index.html"));
    mainWindow.on("closed", function () { return (mainWindow.destroy()); });
    mainWindow.setMenu(null);
    electron_1.ipcMain.on('error', function (event, msg) {
        electron_1.dialog.showErrorBox('Error', msg);
    });
    electron_1.ipcMain.on(constants_1.FILE_REQUEST_MSG, function (event) {
        //console.log(`${path.join(__dirname, "./data.xml")}`);
        fs.readFile("" + path.join(__dirname, "../data.xml"), function (err, data) {
            if (err) {
                throw err;
            }
            else {
                var dataStr = data.toString();
                event.sender.send(constants_1.FILE_RESPONSE_MSG, dataStr);
            }
        });
    });
    electron_1.ipcMain.on(constants_1.TRANSFORM_CALL, function () {
        fs.readFile("" + path.join(__dirname, "../data.xml"), function (err, data) {
            if (err) {
                throw err;
            }
            else {
                var xlst = fs.readFileSync("" + path.join(__dirname, "../stylesheet.xsl"));
                var parser = new xmldom_1.DOMParser();
                var newData_1 = xslt_ts_1.xsltProcess(parser.parseFromString(data.toString()), parser.parseFromString(xlst.toString()));
                electron_1.dialog.showSaveDialog(mainWindow, {
                    filters: [{
                            name: 'HTML files',
                            extensions: ['.html']
                        }]
                }, function (filename) {
                    if (!filename) {
                        return;
                    }
                    fs.writeFileSync("" + filename, newData_1);
                });
            }
        });
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
