import yaml from 'js-yaml';

import getFileFormat from './getFileFormat.js';
import getFileData from './getFileData.js';

import formatInputConstants from '../constants/formatInputConstants.js';

export default (filepath) => {
  const fileFormat = getFileFormat(filepath);
  const fileData = getFileData(filepath);

  if (fileFormat === formatInputConstants.json) {
    return JSON.parse(fileData);
  }
  if (fileFormat === formatInputConstants.yml || fileFormat === formatInputConstants.yaml) {
    return yaml.load(fileData);
  }
  throw new Error('Not available input format');
};
