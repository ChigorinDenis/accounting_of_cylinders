const routesEquipment = [
  {
    method: "handle",
    routeName: "get-equipment",
    query: `SELECT e.id, e.name, e.prod_number, c.number, c.check_date
    FROM equipment e
    JOIN certificate c ON e.id = c.id_equipment
    WHERE c.status = 'current';`,
  },
  {
    method: "on",
    routeName: "add-equipment",
    func: (formData) => {
      const { id, name, prod_number } = formData;
      const query = `INSERT INTO \`equipment\` (\`id\`, \`name\`, \`prod_number\`)
        VALUES (${id}, '${name}', '${prod_number}');`;
      return query;
    },
  },
];

module.exports = routesEquipment;
