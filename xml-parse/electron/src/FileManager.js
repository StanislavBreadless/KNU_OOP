"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var fs = require("fs");
var FileManager = /** @class */ (function () {
    function FileManager(mainWindow) {
        this.mainWindow = mainWindow;
        this.fileFilters = [{
                name: 'JSON file',
                extensions: ['json']
            }];
        this.operationsCounter = 0;
        this.operationLock = false;
    }
    FileManager.prototype.saveFile = function (text) {
        var filePath = electron_1.dialog.showSaveDialog(this.mainWindow, {
            filters: this.fileFilters
        });
        if (!filePath) {
            return;
        }
        fs.writeFileSync(filePath, text);
    };
    ;
    FileManager.prototype.saveTable = function () {
        var _this = this;
        if (this.operationLock) {
            return;
        }
        this.operationLock = true;
        this.mainWindow.webContents.send('save-data');
        var currentOp = this.operationsCounter;
        electron_1.ipcMain.on('save-data', function (event, msg) {
            if (currentOp !== _this.operationsCounter) {
                return;
            }
            _this.saveFile(msg);
            _this.operationLock = false;
            _this.operationsCounter++;
        });
    };
    FileManager.prototype.loadTable = function () {
        var _this = this;
        if (this.operationLock) {
            return;
        }
        this.operationLock = true;
        var filePath = electron_1.dialog.showOpenDialog(this.mainWindow, {
            filters: this.fileFilters
        });
        if (!filePath) {
            this.operationLock = true;
            return;
        }
        fs.readFile(filePath[0], {}, function (err, data) {
            if (err) {
                electron_1.dialog.showErrorBox('Failed to open file', err.message);
                _this.operationLock = false;
                return;
            }
            _this.mainWindow.webContents.send('load-data', data.toString());
            _this.operationLock = false;
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
