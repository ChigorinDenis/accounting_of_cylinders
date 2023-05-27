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
    routeName: "add-pneumatic-control-items",
    func: (formData) => {
      const { idExpertise, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idExpertise}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO \`pneumatic_control\` (\`id_expertise\`, \`id_baloon\`) VALUES ${values}`;
      console.log(query);
      return query;
    },
  },
];

module.exports = routesPneumoControl;