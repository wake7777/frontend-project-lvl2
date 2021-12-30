import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (format, dataTree) => {
  if (format === 'stylish') {
    return stylish(dataTree);
  }
  if (format === 'plain') {
    return plain(dataTree);
  }
  if (format === 'json') {
    return JSON.stringify(dataTree);
  }
  return 1;
};

export default formatter;
