const routesPneumoControl = [
  {
    method: "handle",
    routeName: "get-pneumatic-control-by-id",
    func: (value) => {
      const query = `SELECT pc.* FROM expertise e
      JOIN pneumatic_control pc ON pc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-pneumatic-control-result",
    func: (value) => {
      const query = `SELECT b.prod_number, b.prod_date, pr.*
      FROM expertise e
      JOIN pneumatic_control pc ON pc.id_expertise = e.id
      JOIN pneumatic_result pr ON pr.id_pneumatic_control = pc.id
      JOIN baloon b ON b.id = pr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-control-employee",
    func: (formData) => {
      const { idControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO pneumatic_control_employee (id_pneumatic_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-pneumatic-control-equipment",
    func: (formData) => {
      const { idControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idControl}, ${idEquipment})`).join(', ');
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
  {
    method: "on",
    routeName: "update-pneumatic-control",
    func: (formData) => {
      const { idControl, common } = formData;
      const {
        ntd_quality_doc,
        date,
        name
      } = common;
      const query = `UPDATE pneumatic_control
      SET ntd_quality_doc ='${ntd_quality_doc}', date ='${date}', name = '${name}'
      WHERE id = ${idControl}`;
      return query;
    },
  },
  {
    method: "on",
    multiple: true,
    routeName: "update-pneumatic-result",
    func: (formData) => {
      const queries = formData.map((rc) => {
        const {
          id,
          load_100,
          load_200,
          load_300,
          load_400,
          load_420,
          check_result,
        } = rc;
        const query = `UPDATE pneumatic_result
        SET load_100='${load_100}', load_200='${load_200}', load_300='${load_300}', 
        load_400='${load_400}', load_420='${load_420}', check_result=${check_result}
        WHERE id = ${id}`;
        return query;
      } );
      
      return queries
    },
  }
];

module.exports = routesPneumoControl;