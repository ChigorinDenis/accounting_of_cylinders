const _  = require('lodash');
const fs = require('fs');

const differenceInMonths = require('date-fns/differenceInMonths');

const performData = (data) => {
 return new Promise((resolve, reject) => {
  const unique =_.uniqWith(data, _.isEqual);
  const transformedData = _.chain(unique)
  .groupBy(item => `${item.baloon_id}-${item.prod_number}-${item.prod_date}`)
  .map((groupedItems, key) => {
    const [baloon_id, prod_number, prod_date] = key.split('-');
    const expertises = _.map(groupedItems, item => _.pick(item, [ 'id', 'date', 'visual_check_result', 'ultrasonic_check_result', 'solid_check_result', 'pneumatic_check_result']));
    return { id: Number(baloon_id), prod_number, prod_date, expertises };
  })
  .value();

  resolve(transformedData);
 });
};

const writeToFile = (data, fileName) => {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.log('Error write  json file', err);
    } else {
      console.log('Data written successfully');
    }
  });
}


const getExpertiseData = (connection) => {
   const query = `SELECT expertise.id, expertise.date, visual_result.check_result AS visual_check_result,
   ultrasonic_result.check_result AS ultrasonic_check_result,
   solid_result.check_result AS solid_check_result, pneumatic_result.check_result AS pneumatic_check_result,
   baloon.id AS baloon_id, baloon.prod_number, baloon.prod_date
   FROM expertise
   LEFT JOIN visual_control ON expertise.id = visual_control.id_expertise
   LEFT JOIN ultrasonic_control ON expertise.id = ultrasonic_control.id_expertise
   INNER JOIN visual_result ON visual_control.id = visual_result.id_visual_control
   INNER JOIN ultrasonic_result ON ultrasonic_control.id = ultrasonic_result.id_ultrasonic_control
   LEFT JOIN pneumatic_control ON expertise.id = pneumatic_control.id_expertise
   INNER JOIN pneumatic_result ON pneumatic_control.id = pneumatic_result.id_pneumatic_control
   LEFT JOIN solid_control ON expertise.id = solid_control.id_expertise
   INNER JOIN solid_result ON solid_control.id = solid_result.id_solid_control
   INNER JOIN baloon ON visual_result.id_baloon = baloon.id 
   AND ultrasonic_result.id_baloon = baloon.id 
   AND pneumatic_result.id_baloon = baloon.id 
   AND solid_result.id_baloon = baloon.id`;
   
   
   return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error to get all statistic ', error);
        reject(error);
      } else {
        console.log('Data for statistic is getted');
        if (results.length > 0) {
          console.log('length', results.length);
        }
        
        resolve(results);
      }
    });
  });
};



const isBaloonDead = ({
  visual_check_result,
  ultrasonic_check_result,
  solid_check_result,
  pneumatic_check_result}) => (!(
    visual_check_result &&
    ultrasonic_check_result &&
    solid_check_result &&
    pneumatic_check_result
  ));


const survival = (data, startPointDate = '2009-05-22') => {
  const startDate = new Date(startPointDate);

  return new Promise((resolve, reject) => {
    const survivalData = [];
    
    data.forEach((baloon) => {
      const { id, expertises } = baloon;
      // console.log('baloonid', id, 'expertiseLength', expertises.length)
      for (const expertise of expertises) {
        const finded = survivalData.find((item) => item.id === expertise.id);
        const survivalItem = {};
        
        const dead = isBaloonDead(expertise) ? 1 : 0;
        // console.log('baloonid', id, 'expertiseId', expertise.id, 'dead', dead)
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
          survivalItem.f = (1 - (survivalItem.dead / survivalItem.total))
          survivalData.push(survivalItem)
        }   
      }
    })
      
    const excludedZeroDeathSurvivalData = survivalData.filter(item => item.dead != 0);

    const result = excludedZeroDeathSurvivalData.map((item, index) => {
      const sliced = excludedZeroDeathSurvivalData.slice(0, index);
      const multiple = sliced.reduce((acc, sl) => (acc * sl.f), 1);
      return { ...item, St: multiple} 
    });

    resolve({
      failureData: survivalData,
      survivalData: result
    });
  }) 
}

const buildProbabilitiesData = async (connection) => {
  try {
    const sqlData = await getExpertiseData(connection);
    const performed = await performData(sqlData);
    const survivalData = await survival(performed);
    writeToFile(performed, './data/performed.json');
    writeToFile(survivalData, './data/survival.json');
  } catch (error) {
    console.error('Error:', error);
  }
}

module.exports = buildProbabilitiesData;
