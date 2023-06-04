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
  },
  {
    method: "handle",
    routeName: "get-visual-control-employees",
    func: (value) => {
      const query = `SELECT employee.*
      FROM visual_control
      JOIN visual_control_employee ON visual_control.id = visual_control_employee.id_visual_control
      JOIN employee ON visual_control_employee.id_employee = employee.id
      WHERE visual_control.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-ultrasonic-control-employees",
    func: (value) => {
      const query = `SELECT employee.*
      FROM ultrasonic_control
      JOIN ultrasonic_control_employee ON ultrasonic_control.id = ultrasonic_control_employee.id_ultrasonic_control
      JOIN employee ON ultrasonic_control_employee.id_employee = employee.id
      WHERE ultrasonic_control.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-solid-control-employees",
    func: (value) => {
      const query = `SELECT employee.*
      FROM solid_control
      JOIN solid_control_employee ON solid_control.id = solid_control_employee.id_solid_control
      JOIN employee ON solid_control_employee.id_employee = employee.id
      WHERE solid_control.id_expertise = ${value}`;
      return query;
    },
  },
]

module.exports = routesEmployees;