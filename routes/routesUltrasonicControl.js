const routesUltrasonicControl = [
  {
    method: "handle",
    routeName: "get-ultrasonic-control-items",
    func: (value) => {
      const query = `SELECT b.id, b.prod_number, ul.*
      FROM baloon AS b
      JOIN ultrasonic_control AS ul ON b.id = uc.id_baloon
      WHERE uc.id_expertise = ${value}`;
      return query;
    },
  },
  {
    method: "on",
    routeName: "add-ultrasonic-control-items",
    func: (formData) => {
      const { idExpertise, idBaloons } = formData;
      const values = idBaloons.map((idBaloon) => `(${idExpertise}, ${idBaloon})`).join(', ');
      const query = `INSERT INTO \`ultrasonic_control\` (\`id_expertise\`, \`id_baloon\`) VALUES ${values}`;
      console.log(query);
      return query;
    },
  },
];

module.exports = routesUltrasonicControl;
