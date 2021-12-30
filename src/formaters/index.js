import stylish from './stylish.js';
import plain from './plain.js';

import formatOutputConstants from '../constants/formatOutputConstants.js';

const formatter = (format, dataTree) => {
  if (format === formatOutputConstants.stylish) {
    return stylish(dataTree);
  }
  if (format === formatOutputConstants.plain) {
    return plain(dataTree);
  }
  if (format === formatOutputConstants.json) {
    return JSON.stringify(dataTree);
  }
  return 1;
};

export default formatter;
