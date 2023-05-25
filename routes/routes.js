const routesBaloons = require('./routesBaloons');
const routesEmployees = require('./routesEmployees');
const routesEquipment = require('./routesEquipments');
const routesExpertise = require('./routesExperise');

function subscribeToRoutes(ipcMain, connection) {
  const allRoutes = [
    ...routesBaloons,
    ...routesEmployees,
    ...routesEquipment,
    ...routesExpertise
  ];

  allRoutes.forEach((route) => {
    if (route.method === 'handle') {
      ipcMain.handle(route.routeName, async () => {
        return new Promise((resolve, reject) => {
          connection.query(route.query, (error, results) => {
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
            console.log('Record is added to DB')
          }
        });
        console.log('Main process recieved data from Renderer', formData)
      });
    }
  })
}

module.exports = subscribeToRoutes;