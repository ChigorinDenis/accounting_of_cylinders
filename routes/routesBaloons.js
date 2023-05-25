const routesBaloons = [
  {
    method: 'handle',
    routeName: 'get-baloons',
    query: 'SELECT * FROM baloon'
  },
  {
    method: 'on',
    routeName: 'add-baloon',
    func: (formData) => {
      const {
        prod_number,
        prod_date,
        pressure_work,
        shape,
        volume,
        env,
        thickness,
        diameter,
        length,
        mark,
        gost,
        status
      } = formData;
    
      const query = `INSERT INTO \`baloon\` (\`prod_number\`, \`prod_date\`, \`pressure_work\`, \`shape\`, \`volume\`, \`env\`, \`thickness\`, \`diameter\`, \`length\`, \`mark\`, \`gost\`, \`status\`) 
      VALUES (${prod_number}, ${prod_date}, ${pressure_work}, '${shape}', ${volume}, '${env}', ${thickness}, ${diameter}, ${length}, '${mark}', '${gost}', 'InActive');`;
      return query;
    }
  }
]

module.exports = routesBaloons;