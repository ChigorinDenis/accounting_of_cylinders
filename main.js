
const { BrowserWindow, app, ipcMain, Notification } = require('electron');
const path = require('path');
const url = require('url');

const isDev = require('electron-is-dev');
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'craft',
  password: '111',
  database: 'ref-book-catalog'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connection to DB: ', error);
  } else {
    console.log('Connection to DB is successfull');
  }
});

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

  win.setTitle('Экпертиза проводимая по балонам');
  // win.loadFile('index.html');
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
}



// ipcMain.on('notify', (_, message) => {
//   new Notification({title: 'Notifiation', body: message}).show();
// })


// ipcMain.handle('get-books', (event, args) => {
//   const query = 'SELECT * FROM book';
//   let response;
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error by execute query', error);
//       response = { success: false, error: error.message };
//     } else {
//       response = { success: true, books: results }; 
//       console.error('There is no problem', response);
//     }
//   });
//   console.log(response);
//   return response;
//   });

ipcMain.handle('get-books', async () => {
  const query = 'SELECT * FROM book';

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Ошибка при выполнении запроса: ', error);
        reject(error);
      } else {
        console.log(results)
        resolve(results);
      }
    });
  });
});

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