const { promisify } = require('util');
const { dialog } = require('electron');

const routesBaloons = require('./routesBaloons');
const routesEmployees = require('./routesEmployees');
const routesEquipment = require('./routesEquipments');
const routesExpertise = require('./routesExperise');
const routesVisualControl = require('./routesVisualControl');
const routesUltrasonicControl = require('./routesUltrasonicControl');
const routesSolidControl = require('./routesSolidControl');
const routesPneumoControl = require('./routesPneumoControl');
const routesMath = require('./routesMath');
const getExpertiseAllInfo = require('./routesDocx');
const runWord = require('../printout/index');

function subscribeToRoutes(ipcMain, connection) {
  const allRoutes = [
    ...routesBaloons,
    ...routesEmployees,
    ...routesEquipment,
    ...routesExpertise,
    ...routesVisualControl,
    ...routesUltrasonicControl,
    ...routesSolidControl,
    ...routesPneumoControl
  ];

  ipcMain.handle(routesMath.routeName, () => {
    return new Promise((resolve, reject) => {
      try {
        const mathResult = routesMath.func();
        mathResult.then((result) => {
          resolve(result);
        })
      } catch (error) {
        reject(error);
      }
    });
  })

  ipcMain.handle('get-expertise-all-info', async (event, value) => {
    console.log('route is working');
    const expertiseAllInfo = await getExpertiseAllInfo(connection, value);
    const { expertise_data } = expertiseAllInfo;
    const fileName = expertise_data[0].number;

    const options = {
          title: 'Выберите директорию для сохранения файла',
          buttonLabel: 'Сохранить',
          properties: ['openDirectory'],
          defaultPath: `Заключение экпертизы ${fileName}`,
          filters: [
            { name: 'Документы', extensions: ['docx'] },
            // Дополнительные типы файлов
          ]
        };
    dialog.showSaveDialog(options).then((result) => {
      if (!result.canceled) {
        const selectedDirectory = result.filePath;
        // Отправляем выбранную директорию в Renderer process
        console.log(result);
        
        // event.reply('selected-directory', selectedDirectory);
        runWord(expertiseAllInfo, selectedDirectory);
      }
    });
   
  })

  // ipcMain.on('save-dialog', (event) => {
  //   const options = {
  //     title: 'Выберите директорию для сохранения файла',
  //     buttonLabel: 'Сохранить',
  //     properties: ['openDirectory']
  //   };
  
    
  // })

  allRoutes.forEach((route) => {
    if (route.method === 'handle') {
      ipcMain.handle(route.routeName, async (event, value) => {
        const query = route.func ? route.func(value) : route.query;
        return new Promise((resolve, reject) => {
          connection.query(query, (error, results) => {
            if (error) {
              console.error('Ошибка при выполнении запроса: ', error);
              reject(error);
            } else {
              resolve(results);
            }
          });
        });
      });
    }
    if (route.method === 'on') {
      ipcMain.on(route.routeName, async (event, formData) => {
        if (route.multiple) {
          const queryPromise = promisify(connection.query).bind(connection);
          const queries = route.func(formData);
          try {
            for (const query of queries) {
              await queryPromise(query);
            }
            console.log('Update successful');
          } catch (error) {
            console.error('Update failed:', error);
          }
        } else {
          const query = route.func(formData);
          connection.query(query, (error, results) => {
            if (error) {
              console.error('Ошибка при выполнении запроса: ', error);
            } else {
              const insertedId = results.insertId;
              console.log('ID созданной записи:', insertedId);
              console.log('Record is added to DB');
              event.returnValue = insertedId;
            }
          });
          console.log('Main process recieved data from Renderer', formData);
        }
      });
    }
  })
}

module.exports = subscribeToRoutes;