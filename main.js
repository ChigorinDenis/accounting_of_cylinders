
const { BrowserWindow, app, ipcMain, Notification, dialog } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');
const mysql = require('mysql2');
const buildProbabilitiesData = require('./mathModel/prepareData');
const runWord = require('./printout/index.js');
const subscribeToRoutes = require('./routes/routes');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'craft',
  password: '111',
  database: 'baloons'
});

function handleConnect() {
  connection.connect((err) => {
    if (err) {
      console.error('Error connection to DB', err);
      throw err;
    } else {
      console.log('Connection to DB is successfull');
    }
  });
}

handleConnect();

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.setTitle('Экспертиза проводимая по балонам');
  // win.loadFile('index.html');
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
  win.setMenu(null);
}



// ipcMain.on('notify', (_, message) => {
//   new Notification({title: 'Notifiation', body: message}).show();
// })

// buildProbabilitiesData(connection); 

subscribeToRoutes(ipcMain, connection);
// runWord();

app.setPath('userData', path.join(__dirname, 'build', 'fonts'));
  
app.whenReady().then(() => {
  createWindow();
  if (isDev) {
    console.log('Is dev mode!');
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
  }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

