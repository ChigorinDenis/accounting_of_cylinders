const fs = require('fs');

const routesMath =  {
    method: 'handle',
    routeName: 'get-math',
    func: () => {
      return new Promise((resolve, reject) => {
        fs.readFile('./data/survival.json', (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const statistics = JSON.parse(data);
            resolve(statistics);
          }
        });
      });
    }
    
  };

module.exports = routesMath;