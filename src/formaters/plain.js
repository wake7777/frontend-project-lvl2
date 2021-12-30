import formatTypeConstants from '../constants/formatTypeConstants.js';

const getStringPlain = (data) => {
    if (typeof data === 'object' && data !== null) {
      return '[complex value]';
    } if (typeof data === 'string') {
      return `'${data}'`;
    } if (data === null) {
      return null;
    }
    return String(data);
  };

  const plain = (dataTree) => {
    const iter = (data, parents) => data
      .filter((item) => item.type !== formatTypeConstants.same)
      .map((item) => {
        const parInclude = parents ? `${parents}.${item.key}` : item.key;
        switch (item.type) {
          case formatTypeConstants.add:
            return `Property '${parInclude}' was added with value: ${getStringPlain(item.value)}`;
          case formatTypeConstants.remove:
            return `Property '${parInclude}' was removed`;
          case formatTypeConstants.update:
            return `Property '${parInclude}' was updated. From ${getStringPlain(item.value1)} to ${getStringPlain(item.value2)}`;
          case formatTypeConstants.recursion:
            return `${iter(item.children, parInclude)}`;
          default:
            throw new Error(`Этого типа не существует: ${item.type}`);
        }
      }).join('\n');
    return iter(dataTree);
  }

  export default plain;