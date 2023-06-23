const routesVisualControl = [
  {
    method: "handle",
    routeName: "get-visual-control-by-id",
    func: (value) => {
      const query = `SELECT vc.* FROM expertise e
      JOIN visual_control vc ON vc.id_expertise = e.id
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "handle",
    routeName: "get-visual-control-result",
    func: (value) => {
      console.log('get-visul result is worked', value)
      const query = `SELECT b.prod_number, b.prod_date, vr.id, vr.check_result, vr.description
      FROM expertise e
      JOIN visual_control vc ON vc.id_expertise = e.id
      JOIN visual_result vr ON vr.id_visual_control = vc.id
      JOIN baloon b ON b.id = vr.id_baloon
      WHERE e.id = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-visual-control",
    func: (formData) => {
      const { idExpertise } = formData;
      const query = `INSERT INTO visual_control (id_expertise) VALUES (${idExpertise})`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-visual-control-employee",
    func: (formData) => {
      const { idControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO visual_control_employee (id_visual_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-visual-control-equipment",
    func: (formData) => {
      const { idControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idControl}, ${idEquipment})`).join(', ');
      const query = `INSERT INTO visual_control_equipment (id_visual_control, id_equipment) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-visual-result",
    func: (formData) => {
      const { idVisualControl, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idVisualControl}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO visual_result (id_visual_control, id_baloon) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "update-visual-control",
    func: (formData) => {
      const { idControl, common } = formData;
      const {
        ntd_doc,
        volme_control,
        date,
        name
      } = common;
      const query = `UPDATE visual_control
      SET ntd_doc ='${ntd_doc}', volme_control ='${volme_control}', date ='${date}', name = '${name}'
      WHERE id = ${idControl}`;
      return query;
    },
  },
  {
    method: "on",
    multiple: true,
    routeName: "update-visual-result",
    func: (formData) => {
      const queries = formData.map((rc) => {
        const {
          id,
          check_result,
        } = rc;
        const query = `UPDATE visual_result
        SET \`check_result\`='${check_result}'
        WHERE id = ${id}`;
        return query;
      } );
      
      return queries
    },
  },
  // {
  //   method: "on",
  //   routeName: "add-visual-control-equipment",
  //   func: (formData) => {
  //     const { idControl, idEquipments } = formData;
  //     console.log('visual-control-equipment', idEquipments)
  //     const values = idEquipments.map((idEquipment) => `(${idControl}, ${idEquipment})`).join(', ');
  //     const query = `INSERT INTO visual_control_equipment (id_visual_control, id_equipment) VALUES ${values}`;
  //     return query;
  //   },
  // },
  // {
  //   method: "on",
  //   routeName: "add-visual-control-employee",
  //   func: (formData) => {
  //     const { idControl, idEmployees } = formData;
  //     console.log('visual-control-employee', idEmployees)
  //     const values = idEmployees.map((idEmployee) => `(${idControl}, ${idEmployee})`).join(', ');
  //     const query = `INSERT INTO visual_control_employee (id_visual_control, id_employee) VALUES ${values}`;
  //     return query;
  //   },
  // },
];

module.exports = routesVisualControl;

