import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json first test', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  const getResult = readFile('result.txt');
  const result = genDiff(firstFile, secondFile, 'stylish');
  expect(result).toEqual(getResult);
});
