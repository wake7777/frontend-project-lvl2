import isObject from './isObject.js';
import formatTypeConstants from '../constants/formatTypeConstants.js';

const createMapFromObject = (object) => new Map(Object.entries(object));

const buildTree = (firstFile, secondFile) => {
  const fileMaps = [firstFile, secondFile].map(createMapFromObject);

  const [firstFileMap, secondFileMap] = fileMaps;

  const sortedKeys = Object.keys({ ...firstFile, ...secondFile }).sort();

  return sortedKeys.map((key) => {
    const [value1, value2] = fileMaps.map((map) => map.get(key));

    if (!firstFileMap.has(key)) {
      return { type: formatTypeConstants.add, key, value: value2 };
    }

    if (!secondFileMap.has(key)) {
      return { type: formatTypeConstants.remove, key, value: value1 };
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        type: formatTypeConstants.recursion,
        key,
        children: buildTree(value1, value2),
      };
    }

    if (value1 !== value2) {
      return {
        type: formatTypeConstants.update, key, value1, value2,
      };
    }
    return { type: formatTypeConstants.same, key, value: value1 };
  });
};

export default buildTree;
