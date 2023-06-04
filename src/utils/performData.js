import _ from "lodash";

const groupByTwoField = (data, field1, field2) => {
  const groupedData = _(data)
  .groupBy('id')
  .map(group => ({
    [field1]: _.map(group, field1),
    [field2]: _.map(group, field2)
  }))
  .value();
  return groupedData;
}

export { groupByTwoField };