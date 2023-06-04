const routesUltrasonicControl = [
  {
    method: "handle",
    routeName: "get-ultrasonic-control-by-id",
    func: (value) => {
      const query = `SELECT uc.* FROM expertise e
      JOIN ultrasonic_control uc ON uc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-ultrasonic-control-result",
    func: (value) => {
      const query = `SELECT b.prod_number, b.prod_date, ur.id, ur.*
      FROM expertise e
      JOIN ultrasonic_control uc ON uc.id_expertise = e.id
      JOIN ultrasonic_result ur ON ur.id_ultrasonic_control = uc.id
      JOIN baloon b ON b.id = ur.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control-employee",
    func: (formData) => {
      const { idControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO ultrasonic_control_employee (id_ultrasonic_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control-equipment",
    func: (formData) => {
      const { idControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idControl}, ${idEquipment})`).join(', ');
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
  {
    method: "on",
    routeName: "update-ultrasonic-control",
    func: (formData) => {
      const { idControl, common } = formData;
      const {
        ntd_doc,
        ptd_doc,
        volme_control,
        date
      } = common;
      const query = `UPDATE ultrasonic_control
      SET ntd_doc ='${ntd_doc}', ptd_doc = ${ptd_doc} volme_control ='${volme_control}', date ='${date}'
      WHERE id = ${idControl}`;
      return query;
    },
  },
  {
    method: "on",
    multiple: true,
    routeName: "update-ultrasonic-result",
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
        const query = `UPDATE ultrasonic_result
        SET point_1=${point_1}, point_2=${point_2}, point_3=${point_3}, point_4=${point_4}, point_5=${point_5},
        point_6=${point_6}, point_7=${point_7}, point_8=${point_8}, point_9=${point_9}
        WHERE id = ${id}`;
        return query;
      } );
      
      return queries
    },
  },
];

module.exports = routesUltrasonicControl;
