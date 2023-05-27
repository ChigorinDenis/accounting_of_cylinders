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
    routeName: "add-visual-control-items",
    func: (formData) => {
      const { idExpertise, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idExpertise}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO \`visual_control\` (\`id_expertise\`, \`id_baloon\`) VALUES ${values}`;
      console.log(query);
      return query;
    },
  },
];

module.exports = routesVisualControl;

