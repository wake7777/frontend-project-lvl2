import yaml from 'js-yaml';

import formatInputConstants from './constants/formatInputConstants.js';

export default (format, data) => {
  if (format === formatInputConstants.json) {
    return JSON.parse(data);
  }
  if (format === formatInputConstants.yml || format === formatInputConstants.yaml) {
    return yaml.load(data);
  }
  throw new Error('Not available input format');
};
