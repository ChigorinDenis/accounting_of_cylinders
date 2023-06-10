const _  = require('lodash');
const differenceInMonths = require('date-fns/differenceInMonths');

const uniqueData = (data) => {
  const unique =_.uniqWith(data, _.isEqual);
  const transformedData = _.chain(unique)
  .groupBy(item => `${item.baloon_id}-${item.prod_number}-${item.prod_date}`)
  .map((groupedItems, key) => {
    const [baloon_id, prod_number, prod_date] = key.split('-');
    const expertises = _.map(groupedItems, item => _.pick(item, [ 'id', 'date', 'visual_check_result', 'ultrasonic_check_result', 'solid_check_result', 'pneumatic_check_result']));
    return { id: Number(baloon_id), prod_number, prod_date, expertises };
  })
  .value();
 
 return transformedData;
};



const getExpertiseData = (connection) => {
   const query = `SELECT expertise.id, expertise.date, visual_result.check AS visual_check_result,
   ultrasonic_result.check_result AS ultrasonic_check_result,
   solid_result.check_result AS solid_check_result, pneumatic_result.check_result AS pneumatic_check_result,
   baloon.id AS baloon_id, baloon.prod_number, baloon.prod_date
   FROM expertise
   LEFT JOIN visual_control ON expertise.id = visual_control.id_expertise
   LEFT JOIN ultrasonic_control ON expertise.id = ultrasonic_control.id_expertise
   LEFT JOIN solid_control ON expertise.id = solid_control.id_expertise
   LEFT JOIN pneumatic_control ON expertise.id = pneumatic_control.id_expertise
   INNER JOIN visual_result ON visual_control.id = visual_result.id_visual_control
   INNER JOIN ultrasonic_result ON ultrasonic_control.id = ultrasonic_result.id_ultrasonic_control
   INNER JOIN solid_result ON solid_control.id = solid_result.id_solid_control
   INNER JOIN pneumatic_result ON pneumatic_control.id = pneumatic_result.id_pneumatic_control
   LEFT JOIN baloon ON visual_result.id_baloon = baloon.id;`;

   connection.query(query, (error, results) => {
    if (error) {
      console.error('Error to get all statistic ', error);
    } else {
      console.log('Data for statistic is getted');
      const uniq = uniqueData(results)
      const surv = survival(uniq)
      console.log(surv);
      return results;
    }
  });
};


const prepareData = (connection) => {
  const sqlData = getExpertiseData(connection);
  // console.log('nique data');
  // const uniq = uniqueData(sqlData);
  
}
const isBaloonDead = ({
  visual_check_result,
  ultrasonic_check_result,
  solid_check_result,
  pneumatic_check_result}) => (
    visual_check_result &&
    ultrasonic_check_result &&
    solid_check_result &&
    pneumatic_check_result
  );


const survival = (data, startPointDate = '2021-03-22') => {
  const startDate = new Date(startPointDate);

  const survivalTable = data
    .reduce((acc, baloon) => {
      const { id, expertises } = baloon;
      let finded;
      const survivalItem = {};

      for (const expertise of expertises) {
        finded = acc.find((item) => item.id === expertise.id);
        const dead = isBaloonDead(expertise) ? 1 : 0;
        if (finded) {
          finded.total += 1;
          finded.dead += dead;
          finded.f = (1 - (finded.dead / finded.total));
        }
        else {
          const time = differenceInMonths(new Date(expertise.date), startDate);
          survivalItem.id = expertise.id;
          survivalItem.time = time;
          survivalItem.total = 1;
          survivalItem.dead = dead;
          survivalItem.f = (1 - (survivalItem.dead / survivalItem.total));
          acc.push(survivalItem)
        } 
      }
      return acc;
    }, [])
  return survivalTable.map((item, index) => {
    const sliced = survivalTable.slice(0, index);
    const multiple = sliced.reduce((acc, sl) => (acc * sl.f), 1);
    return { ...item, St: multiple} 
  });  
}

module.exports = prepareData;