import _ from 'lodash';
import formatTypeConstants from './constants/formatTypeConstants.js';

const buildTree = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortKeys = _.sortBy(keys);
  return sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (!_.has(data1, key)) {
      return { type: formatTypeConstants.add, key, value: value2 };
    }
    if (!_.has(data2, key)) {
      return { type: formatTypeConstants.remove, key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: formatTypeConstants.recursion, key, children: buildTree(value1, value2) };
    }
    if (_.has(data1, key) && _.has(data2, key) && value1 !== value2) {
      return {
        type: formatTypeConstants.update, key, value1, value2,
      };
    }
    return { type: formatTypeConstants.same, key, value: value1 };
  });
};

export default buildTree;
