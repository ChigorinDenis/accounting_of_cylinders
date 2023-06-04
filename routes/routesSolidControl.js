const routesSolidControl = [
  {
    method: "handle",
    routeName: "get-solid-control-by-id",
    func: (value) => {
      const query = `SELECT sc.* FROM expertise e
      JOIN solid_control sc ON sc.id_expertise = e.id
      WHERE e.id = ${value}`;
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
      const { idControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO solid_control_employee (id_solid_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-solid-control-equipment",
    func: (formData) => {
      const { idControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idControl}, ${idEquipment})`).join(', ');
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
  {
    method: "on",
    routeName: "update-solid-control",
    func: (formData) => {
      const { idControl, common } = formData;
      const {
        ntd_type_doc,
        ntd_quality_doc,
        volme_control,
        date
      } = common;
      const query = `UPDATE solid_control
      SET ntd_type_doc ='${ntd_type_doc}', ntd_quality_doc = ${ntd_quality_doc} volme_control ='${volme_control}', date ='${date}'
      WHERE id = ${idControl}`;
      return query;
    },
  },
  {
    method: "on",
    multiple: true,
    routeName: "update-solid-result",
    func: (formData) => {
      const queries = formData.map((rc) => {
        const {
          id,
          point_1,
          point_2,
          point_3,
          point_4,
          point_5,
          point_6,
          point_7,
          point_8,
          point_9
        } = rc;
        const query = `UPDATE solid_result
        SET point_1=${point_1}, point_2=${point_2}, point_3=${point_3}, point_4=${point_4}, point_5=${point_5},
        point_6=${point_6}, point_7=${point_7}, point_8=${point_8}, point_9=${point_9}
        WHERE id = ${id}`;
        return query;
      } );
      
      return queries
    },
  },
];

module.exports = routesSolidControl;