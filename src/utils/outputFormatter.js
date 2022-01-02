import formatOutputConstants from '../constants/formatOutputConstants.js';
import formatTypeConstants from '../constants/formatTypeConstants.js';

const getIdent = (depth, spaceCount = 4) => ' '.repeat(spaceCount * depth - 2);

const getString = (data, treeDepth) => {
  if (typeof data !== 'object') {
    return `${data}`;
  }
  if (data === null) {
    return null;
  }
  const lines = Object.entries(data).map(([key, value]) => `${getIdent(treeDepth + 1)}  ${key}: ${getString(value, treeDepth + 1)}`);
  return [
    '{',
    ...lines,
    `${getIdent(treeDepth)}  }`,
  ].join('\n');
};

const getStringPlain = (data) => {
  if (typeof data === 'object' && data !== null) {
    return '[complex value]';
  } if (typeof data === 'string') {
    return `'${data}'`;
  } if (data === null) {
    return 'null';
  }
  return String(data);
};

const stylish = (dataTree) => {
  const iter = (data, depth) => data.map((item) => {
    const getValue = (value, sign) => `${getIdent(depth)}${sign} ${item.key}: ${getString(value, depth)}\n`;
    const formatTypeMapper = {
      [formatTypeConstants.add]: () => getValue(item.value, '+'),
      [formatTypeConstants.remove]: () => getValue(item.value, '-'),
      [formatTypeConstants.same]: () => getValue(item.value, ' '),
      [formatTypeConstants.update]: () => `${getValue(item.value1, '-')}${getValue(item.value2, '+')}`,
      [formatTypeConstants.recursion]: () => `${getIdent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1).join('')}${getIdent(depth)}  }\n`,
    };
    return formatTypeMapper[item.type]();
  });
  return `{\n${iter(dataTree, 1).join('')}}`;
};

const plain = (dataTree) => {
  const iter = (data, parents) => data
    .filter((item) => item.type !== formatTypeConstants.same)
    .map((item) => {
      const propDeph = parents.length ? [...parents, item.key] : [item.key];
      const propName = propDeph.join('.');
      const formatTypeMapper = {
        [formatTypeConstants.add]: () => `Property '${propName}' was added with value: ${getStringPlain(item.value)}`,
        [formatTypeConstants.remove]: () => `Property '${propName}' was removed`,
        [formatTypeConstants.update]: () => `Property '${propName}' was updated. From ${getStringPlain(item.value1)} to ${getStringPlain(item.value2)}`,
        [formatTypeConstants.recursion]: () => `${iter(item.children, propDeph)}`,
      };
      return formatTypeMapper[item.type]();
    }).join('\n');
  return iter(dataTree, []);
};

const outputFormatter = (fileTree, format) => {
  const formatMapper = {
    [formatOutputConstants.stylish]: (tree) => stylish(tree),
    [formatOutputConstants.plain]: (tree) => plain(tree),
    [formatOutputConstants.json]: (tree) => JSON.stringify(tree),
  };
  return formatMapper[format](fileTree);
};

export default outputFormatter;
