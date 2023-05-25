const routesEmployees = [
  {
    method: 'handle',
    routeName: 'get-employees',
    query: 'SELECT * FROM employee'
  },
  {
    method: 'on',
    routeName: 'add-employee',
    func: (formData) => {
    const {
      fullname,
      post,
      certificate_number,
      certificate_date
    } = formData;
    
    const query = `INSERT INTO \`employee\` (\`fullname\`, \`post\`, \`certificate_number\`, \`certificate_date\`) 
      VALUES ('${fullname}', '${post}', '${certificate_number}', '${certificate_date}');`;
    return query;
    }
  }
]

module.exports = routesEmployees;