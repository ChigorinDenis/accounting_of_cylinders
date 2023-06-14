const routesEquipment = [
  {
    method: "handle",
    routeName: "get-equipment",
    query: `SELECT e.id, e.name, e.prod_number, c.number, c.check_date
    FROM equipment e
    JOIN certificate c ON e.id = c.id_equipment
    WHERE c.status = 'current';`,
  },
  {
    method: "handle",
    routeName: "get-visual-control-equipments",
    func: (value) => {
      const query = `SELECT equipment.*
      FROM visual_control
      JOIN visual_control_equipment ON visual_control.id = visual_control_equipment.id_visual_control
      JOIN equipment ON visual_control_equipment.id_equipment = equipment.id
      WHERE visual_control.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-ultrasonic-control-equipments",
    func: (value) => {
      const query = `SELECT equipment.*
      FROM ultrasonic_control
      JOIN ultrasonic_control_equipment ON ultrasonic_control.id = ultrasonic_control_equipment.id_ultrasonic_control
      JOIN equipment ON ultrasonic_control_equipment.id_equipment = equipment.id
      WHERE ultrasonic_control.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-solid-control-equipments",
    func: (value) => {
      const query = `SELECT equipment.*
      FROM solid_control
      JOIN solid_control_equipment ON solid_control.id = solid_control_equipment.id_solid_control
      JOIN equipment ON solid_control_equipment.id_equipment = equipment.id
      WHERE solid_control.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-pneumatic-control-equipments",
    func: (value) => {
      const query = `SELECT equipment.*
      FROM pneumatic_control
      JOIN pneumatic_control_equipment ON pneumatic_control.id = pneumatic_control_equipment.id_pneumatic_control
      JOIN equipment ON pneumatic_control_equipment.id_equipment = equipment.id
      WHERE pneumatic_control.id_expertise = ${value}`;
      return query;
    },
  }, 
  {
    method: "on",
    routeName: "add-equipment",
    func: (formData) => {
      const { name, prod_number } = formData;
      const query = `INSERT INTO \`equipment\` (\`name\`, \`prod_number\`)
        VALUES ('${name}', '${prod_number}');`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-certificate",
    func: (formData) => {
      const { number, check_date, id_equipment } = formData;
      const query = `INSERT INTO \`certificate\` (\`number\`, \`check_date\`, \`status\`, \`id_equipment\`)
        VALUES ('${number}', '${check_date}', 'current', '${id_equipment}');`;
      return query;
    },
  },
];

module.exports = routesEquipment;
