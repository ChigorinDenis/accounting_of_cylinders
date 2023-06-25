export default (data, fields) => {
  for (const item of data) {
    for (const field of fields) {
      if (item[field] === null) {
        return false;
      }
    }
  }
  return true;
}