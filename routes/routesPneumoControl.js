const routesPneumoControl = [
  {
    method: "handle",
    routeName: "get-pneumatic-control-items",
    func: (value) => {
      const query = `SELECT b.id, b.prod_number, pc.*
      FROM baloon AS b
      JOIN pneumatic_control AS pc ON b.id = pc.id_baloon
      WHERE pc.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-control-employee",
    func: (formData) => {
      const { idPneumaticControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idPneumaticControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO pneumatic_control_employee (id_pneumatic_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-control-equipment",
    func: (formData) => {
      const { idPneumaticControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idPneumaticControl}, ${idEquipment})`).join(', ');
      const query = `INSERT INTO pneumatic_control_equipment (id_pneumatic_control, id_equipment) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-result",
    func: (formData) => {
      const { idPneumaticControl, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idPneumaticControl}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO pneumatic_result (id_pneumatic_control, id_baloon) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-control",
    func: (formData) => {
      const { idExpertise } = formData;
      const query = `INSERT INTO pneumatic_control (id_expertise) VALUES (${idExpertise})`;
      return query;
    },
  },
];

module.exports = routesPneumoControl;