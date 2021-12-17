import _ from 'lodash';

const buildTree = (data1, data2) => {
const keys = Object.keys({...data1, ...data2})
const sortKeys = _.sortBy(keys)
const result = sortKeys.map((key) => {
const value1 = data1[key]
const value2 = data2[key]
if (_.has(data1, key) && _.has(data2, key) && value1 === value2) {
    return {type: 'same', key: key, value: value1}
}
if (!_.has(data1, key)) {
    return {type: 'add', key: key, value: value2}
}
if (!_.has(data2, key)) {
    return {type: 'remove', key: key, value: value1}
}
if (_.has(data1, key) && _.has(data2, key) && value1 !== value2) {
    return {type: 'update', key: key, value1: value1, value2: value2}
}
})
return result
}






export default buildTree