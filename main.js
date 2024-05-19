const electronApp = require('electron').app;
const electronBrowserWindow = require('electron').BrowserWindow;
const nodePath = require('path');

let infoBoardWindow;

electronApp.on('ready', () => {

  infoBoardWindow = new electronBrowserWindow({
    width: 1400,
    height: 800,
    show: false,
    icon: nodePath.join(__dirname, '/dist/icon.png'),
    webPreferences: { 
      nodeIntegration: false,
      devTools: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: false,
      preload: nodePath.join(__dirname, 'preload.js')
    }
  });

  infoBoardWindow.loadFile(nodePath.join(__dirname, '/dist/index.html'))
  .then(() => { infoBoardWindow.show(); })
});