const { differenceInMonths, parseISO } = require('date-fns');


function getMonthsDiff(startYear) {
  const endDate = new Date()
  const startDate = parseISO(`${startYear}-05-01`);
  const monthsDiff = differenceInMonths(endDate, startDate);
  return monthsDiff;
}

function getFailureProbability(data, year) {
  // Сортировка данных по времени в порядке возрастания
  const time = getMonthsDiff(year);
  const sortedData = data.slice().sort((a, b) => a.time - b.time);

  // Найти ближайшее значение времени, которое больше или равно заданному времени
  const closestDataPoint = sortedData.find(item => item.time >= time);

  if (closestDataPoint) {
    // Получить вероятность безотказной работы (f) для найденного значения времени
    const survivalProbability = closestDataPoint.St;

    // Вероятность отказа = 1 - вероятность безотказной работы
    const failureProbability = 1 - survivalProbability;

    return failureProbability.toFixed(2);
  }

  // Если не удалось найти ближайшее значение времени,
  // можно вернуть значение по умолчанию или сделать дополнительную обработку
  const middleIndex = Math.floor(data.length / 2);
  return data[middleIndex].St.toFixed(2);
}

function getTimeToFailure(data, failureProbability) {
  // Сортировка данных по вероятности безотказной работы (f) в порядке возрастания
  const sortedData = data.slice().sort((a, b) => a.f - b.f);

  // Найти ближайшее значение вероятности безотказной работы, которое меньше или равно заданной вероятности отказа
  const closestDataPoint = sortedData.find(item => item.f <= failureProbability);

  if (closestDataPoint) {
    // Получить значение времени (time) для найденной вероятности безотказной работы
    const timeToFailure = closestDataPoint.time;

    return timeToFailure;
  }

  // Если не удалось найти ближайшее значение вероятности безотказной работы,
  // можно вернуть значение по умолчанию или сделать дополнительную обработку

  return null;
}

export default getFailureProbability;