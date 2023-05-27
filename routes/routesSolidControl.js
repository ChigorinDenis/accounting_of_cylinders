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
    method: "on",
    routeName: "add-solid-control-items",
    func: (formData) => {
      const { idExpertise, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idExpertise}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO \`solid_control\` (\`id_expertise\`, \`id_baloon\`) VALUES ${values}`;
      console.log(query);
      return query;
    },
  },
];

module.exports = routesSolidControl;