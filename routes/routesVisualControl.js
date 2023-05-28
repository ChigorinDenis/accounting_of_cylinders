const routesVisualControl = [
  {
    method: "handle",
    routeName: "get-visual-control-items",
    func: (value) => {
      const query = `SELECT b.id, b.prod_number, vc.*
      FROM baloon AS b
      JOIN visual_control AS vc ON b.id = vc.id_baloon
      WHERE vc.id_expertise = ${value}`;
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
      const { idVisualControl, idEmployees } = formData;
      const values = idEmployees.map((idEmployee) => `(${idVisualControl}, ${idEmployee})`).join(', ');
      const query = `INSERT INTO visual_control_employee (id_visual_control, id_employee) VALUES ${values}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-visual-control-equipment",
    func: (formData) => {
      const { idVisualControl, idEquipments } = formData;
      const values = idEquipments.map((idEquipment) => `(${idVisualControl}, ${idEquipment})`).join(', ');
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
    multiple: true,
    routeName: "update-visual-control-items-by-common",
    func: (formData) => {
      const { idVisualControls, common } = formData;
      const {
        ntd_doc,
        volme_control,
        date
      } = common;

      const queries = idVisualControls.map((id) => {
        const query = `UPDATE visual_control
        SET ntd_doc ='${ntd_doc}', volme_control ='${volme_control}', date ='${date}'
        WHERE id = ${id}`;
        return query;
      } );
      
      return queries
    },
  },
];

module.exports = routesVisualControl;

