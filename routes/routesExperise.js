const routesExpertise = [
  {
    method: "handle",
    routeName: "get-expertise",
    query: `SELECT * FROM expertise`,
  },
  {
    method: "on",
    routeName: "add-expertise",
    requestRouteName: "expertise-added",
    func: (formData) => {
      const { number, date } = formData;
      const query = `INSERT INTO \`expertise\` (\`number\`, \`date\`)
        VALUES ('${number}', '${date}');`;
      return query;
    },
  },
];

module.exports = routesExpertise;
