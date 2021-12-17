export default (format, data) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  return 1;
};
