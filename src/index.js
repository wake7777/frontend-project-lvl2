import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import formatter from './formaters/index.js';
import buildTree from './buildTree.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
const extractFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (firstFilepath, secondFilepath, outputFormat = 'stylish') => {
  const file1format = extractFormat(firstFilepath);
  const file2format = extractFormat(secondFilepath);
  const fileContent1 = readFile(firstFilepath);
  const fileContent2 = readFile(secondFilepath);
  const data1 = parse(file1format, fileContent1);
  const data2 = parse(file2format, fileContent2);
  const tree = buildTree(data1, data2);
  return formatter(outputFormat, tree);
};
export default genDiff;
