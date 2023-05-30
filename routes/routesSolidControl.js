const routesSolidControl = [
  {
    method: "handle",
    routeName: "get-solid-control-items",
    func: (value) => {
      const query = `SELECT b.id, b.prod_number, sc.*
      FROM baloon AS b
      JOIN solid_control AS sc ON b.id = sc.id_baloon
      WHERE sc.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-solid-control-result",
    func: (value) => {
      const query = `SELECT b.prod_number, b.prod_date, sr.*
      FROM expertise e
      JOIN solid_control sc ON sc.id_expertise = e.id
      JOIN solid_result sr ON sr.id_solid_control = sc.id
      JOIN baloon b ON b.id = sr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-solid-control-employee",
    func: (formData) => {
      const { idSolidControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idSolidControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO solid_control_employee (id_solid_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-solid-control-equipment",
    func: (formData) => {
      const { idSolidControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idSolidControl}, ${idEquipment})`).join(', ');
      const query = `INSERT INTO solid_control_equipment (id_solid_control, id_equipment) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-solid-result",
    func: (formData) => {
      const { idSolidControl, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idSolidControl}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO solid_result (id_solid_control, id_baloon) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-solid-control",
    func: (formData) => {
      const { idExpertise } = formData;
      const query = `INSERT INTO solid_control (id_expertise) VALUES (${idExpertise})`;
      console.log(query);
      return query;
    },
  },
];

module.exports = routesSolidControl;