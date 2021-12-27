import yaml from 'js-yaml';

export default (format, data) => {
  if (format === 'json') {
    return JSON.parse(data);
  }
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  return 1;
};
