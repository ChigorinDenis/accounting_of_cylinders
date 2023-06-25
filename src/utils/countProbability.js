const { differenceInMonths, parseISO } = require('date-fns');


function getMonthsDiff(startYear) {
  const endDate = new Date()
  const startDate = parseISO(`${startYear}-05-01`);
  const monthsDiff = differenceInMonths(endDate, startDate);
  return monthsDiff;
}

function getFailureProbability(data, year, prediction_time) {
  // Сортировка данных по времени в порядке возрастания
  const time = getMonthsDiff(year) + prediction_time;
  
  const sortedData = data.slice().sort((a, b) => a.time - b.time);

  // Найти ближайшее значение времени, которое больше или равно заданному времени
  const closestDataPoint = sortedData.find(item => item.time >= time);

  if (closestDataPoint) {
    // Получить вероятность безотказной работы (f) для найденного значения времени
    const survivalProbability = closestDataPoint.survival;

    // Вероятность отказа = 1 - вероятность безотказной работы
    const failureProbability = 1 - survivalProbability;

    return (failureProbability - 0.01).toFixed(2);
  }

  // Если не удалось найти ближайшее значение времени,
  // можно вернуть значение по умолчанию или сделать дополнительную обработку
  // const middleIndex = Math.floor(data.length / 2);
  return (1 - data[data.length - 1].survival).toFixed(2);
}

function getTimeToFailure(data, year ) {
  // Сортировка данных по вероятности безотказной работы (f) в порядке возрастания
  const failureProbability = 0.1;
  const timeLive = getMonthsDiff(year);
  const sortedData = data.slice().sort((a, b) => a.unsurvival - b.unsurvival);

  // Найти ближайшее значение вероятности безотказной работы, которое меньше или равно заданной вероятности отказа
  const closestDataPoint = sortedData.find(item => item.unsurvival >= failureProbability);

  if (closestDataPoint) {
    // Получить значение времени (time) для найденной вероятности безотказной работы
    const timeToFailure = closestDataPoint.time;
    return timeToFailure - timeLive;
  }

  // Если не удалось найти ближайшее значение вероятности безотказной работы,
  // можно вернуть значение по умолчанию или сделать дополнительную обработку

  // const middleIndex = Math.floor(data.length / 2);
  return data[data.length - 1].time - timeLive;
}

export { getFailureProbability, getTimeToFailure };