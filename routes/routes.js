const routesBaloons = require('./routesBaloons');
const routesEmployees = require('./routesEmployees');
const routesEquipment = require('./routesEquipments');
const routesExpertise = require('./routesExperise');
const routesVisualControl = require('./routesVisualControl');
const routesUltrasonicControl = require('./routesUltrasonicControl');
const routesSolidControl = require('./routesSolidControl');
const routesPneumoControl = require('./routesPneumoControl');

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
      ipcMain.on(route.routeName, (event, formData) => {
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
        console.log('Main process recieved data from Renderer', formData)
      });
    }
  })
}

module.exports = subscribeToRoutes;