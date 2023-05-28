const routesUltrasonicControl = [
  {
    method: "handle",
    routeName: "get-ultrasonic-control-items",
    func: (value) => {
      const query = `SELECT b.id, b.prod_number, ul.*
      FROM baloon AS b
      JOIN ultrasonic_control AS ul ON b.id = uc.id_baloon
      WHERE uc.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control-employee",
    func: (formData) => {
      const { idUltrasonicControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idUltrasonicControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO ultrasonic_control_employee (id_ultrasonic_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control-equipment",
    func: (formData) => {
      const { idUltrasonicControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idUltrasonicControl}, ${idEquipment})`).join(', ');
      const query = `INSERT INTO ultrasonic_control_equipment (id_ultrasonic_control, id_equipment) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-result",
    func: (formData) => {
      const { idUltrasonicControl, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idUltrasonicControl}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO ultrasonic_result (id_ultrasonic_control, id_baloon) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control",
    func: (formData) => {
      const { idExpertise } = formData;
      const query = `INSERT INTO ultrasonic_control (id_expertise) VALUES (${idExpertise})`;
      return query;
    },
  },
];

module.exports = routesUltrasonicControl;
