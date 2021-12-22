import formatTypeConstants from './constants/formatTypeConstants.js';

export default (format, data) => {
  const result = data.reduce((acc, item) => {
    const formatTypeMapper = {
      [formatTypeConstants.remove]: `${acc}\n  ${'-'} ${item.key}: ${item.value}`,
      [formatTypeConstants.same]: `${acc}\n  ${' '} ${item.key}: ${item.value}`,
      [formatTypeConstants.add]: `${acc}\n  ${'+'} ${item.key}: ${item.value}`,
      [formatTypeConstants.update]: `${acc}\n  ${'-'} ${item.key}: ${item.value1}\n  ${'+'} ${item.key}: ${item.value2}`,
    };

    return formatTypeMapper[item.type] || acc;
  }, '{');

  return `${result}\n}`;
};
