const { promisify } = require('util');

const routes = {
  expertise: {
    data: (value) => {
      const query = `SELECT * FROM expertise WHERE expertise.id = ${value}`;
      return query;
    }
  },
  visual :  {
    control:(value) => {
      const query = `SELECT vc.* FROM expertise e
      JOIN visual_control vc ON vc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
    result:(value) => {
      const query = `SELECT b.prod_number, b.prod_date, vr.id, vr.check_result, vr.description
      FROM expertise e
      JOIN visual_control vc ON vc.id_expertise = e.id
      JOIN visual_result vr ON vr.id_visual_control = vc.id
      JOIN baloon b ON b.id = vr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
    equipments: (value) => {
      const query = `SELECT equipment.*
      FROM visual_control
      JOIN visual_control_equipment ON visual_control.id = visual_control_equipment.id_visual_control
      JOIN equipment ON visual_control_equipment.id_equipment = equipment.id
      WHERE visual_control.id_expertise = ${value}`;
      return query;
    },
    employees: (value) => {
      const query = `SELECT employee.*
      FROM visual_control
      JOIN visual_control_employee ON visual_control.id = visual_control_employee.id_visual_control
      JOIN employee ON visual_control_employee.id_employee = employee.id
      WHERE visual_control.id_expertise = ${value}`;
      return query;
    }  
  },
  ultrasonic: {
    control:(value) => {
      const query = `SELECT uc.* FROM expertise e
      JOIN ultrasonic_control uc ON uc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
    result:(value) => {
      const query = `SELECT b.prod_number, b.prod_date, ur.id, ur.*
      FROM expertise e
      JOIN ultrasonic_control uc ON uc.id_expertise = e.id
      JOIN ultrasonic_result ur ON ur.id_ultrasonic_control = uc.id
      JOIN baloon b ON b.id = ur.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
    equipments: (value) => {
      const query = `SELECT equipment.*
      FROM ultrasonic_control
      JOIN ultrasonic_control_equipment ON ultrasonic_control.id = ultrasonic_control_equipment.id_ultrasonic_control
      JOIN equipment ON ultrasonic_control_equipment.id_equipment = equipment.id
      WHERE ultrasonic_control.id_expertise = ${value}`;
      return query;
    },
    employees: (value) => {
      const query = `SELECT employee.*
      FROM ultrasonic_control
      JOIN ultrasonic_control_employee ON ultrasonic_control.id = ultrasonic_control_employee.id_ultrasonic_control
      JOIN employee ON ultrasonic_control_employee.id_employee = employee.id
      WHERE ultrasonic_control.id_expertise = ${value}`;
      return query;
    } 
  },
  solid: {
    control:(value) => {
      const query = `SELECT sc.* FROM expertise e
      JOIN solid_control sc ON sc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
    result:(value) => {
      const query = `SELECT b.prod_number, b.prod_date, sr.*
      FROM expertise e
      JOIN solid_control sc ON sc.id_expertise = e.id
      JOIN solid_result sr ON sr.id_solid_control = sc.id
      JOIN baloon b ON b.id = sr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
    equipments: (value) => {
      const query = `SELECT equipment.*
      FROM solid_control
      JOIN solid_control_equipment ON solid_control.id = solid_control_equipment.id_solid_control
      JOIN equipment ON solid_control_equipment.id_equipment = equipment.id
      WHERE solid_control.id_expertise = ${value}`;
      return query;
    },
    employees: (value) => {
      const query = `SELECT employee.*
      FROM solid_control
      JOIN solid_control_employee ON solid_control.id = solid_control_employee.id_solid_control
      JOIN employee ON solid_control_employee.id_employee = employee.id
      WHERE solid_control.id_expertise = ${value}`;
      return query;
    } 
  },
  pneumatic: {
    control:(value) => {
      const query = `SELECT pc.* FROM expertise e
      JOIN pneumatic_control pc ON pc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
    result:(value) => {
      const query = `SELECT b.prod_number, b.prod_date, pr.*
      FROM expertise e
      JOIN pneumatic_control pc ON pc.id_expertise = e.id
      JOIN pneumatic_result pr ON pr.id_pneumatic_control = pc.id
      JOIN baloon b ON b.id = pr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
    equipments: (value) => {
      const query = `SELECT equipment.*
      FROM pneumatic_control
      JOIN pneumatic_control_equipment ON pneumatic_control.id = pneumatic_control_equipment.id_pneumatic_control
      JOIN equipment ON pneumatic_control_equipment.id_equipment = equipment.id
      WHERE pneumatic_control.id_expertise = ${value}`;
      return query;
    },
    employees: (value) => {
      const query = `SELECT employee.*
      FROM pneumatic_control
      JOIN pneumatic_control_employee ON pneumatic_control.id = pneumatic_control_employee.id_pneumatic_control
      JOIN employee ON pneumatic_control_employee.id_employee = employee.id
      WHERE pneumatic_control.id_expertise = ${value}`;
      return query;
    } 
  },  
}

const getExpertiseAllInfo = async (connection, idExpertise) => {
  const resultData = {};
  const queryPromise = promisify(connection.query).bind(connection);
  for (const keyControl in routes) {
    const control = routes[keyControl];
    for (const keyResult in control) {
      const query = control[keyResult](idExpertise);
      try {
        resultData[`${keyControl}_${keyResult}`] = await queryPromise(query)
      } catch (error) {
        console.error('Ошибка при выполнении запроса: ', error);
      }
    }
  }
  return resultData;
}

module.exports = getExpertiseAllInfo;
