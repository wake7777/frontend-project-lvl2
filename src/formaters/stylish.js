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

const stylish = (dataTree) => {
    const iter = (data, depth) => data.map((item) => {
        const getValue = (value, sign) => `${getIdent(depth)}${sign} ${item.key}: ${getString(value, depth)}\n`;
        switch (item.type) {
          case formatTypeConstants.add:
            return getValue(item.value, '+');
          case formatTypeConstants.remove:
            return getValue(item.value, '-');
          case formatTypeConstants.same:
            return getValue(item.value, ' ');
          case formatTypeConstants.update:
            return `${getValue(item.value1, '-')}${getValue(item.value2, '+')}`;
          case formatTypeConstants.recursion:
            return `${getIdent(depth)}  ${item.key}: {\n${iter(item.children, depth + 1).join('')}${getIdent(depth)}  }\n`;
          default:
            throw new Error(`Этого типа не существует: ${item.type}`);
        }
      });
      return `{\n${iter(dataTree, 1).join('')}}`;
}

export default stylish;