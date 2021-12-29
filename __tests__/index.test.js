import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('first test', () => {
  const firstFile = getFixturePath('file1.json');
  const secondFile = getFixturePath('file2.json');
  const getResult = readFile('result.txt');
  const result = genDiff(firstFile, secondFile, 'stylish');
  expect(result).toEqual(getResult);
});

test('yml test', () => {
  const firstFile = getFixturePath('file1.yml');
  const secondFile = getFixturePath('file2.yml');
  const getResult = readFile('result.txt');
  const result = genDiff(firstFile, secondFile, 'stylish');
  expect(result).toEqual(getResult);
});

test('second test long', () => {
  const firstFile = getFixturePath('file1L.json');
  const secondFile = getFixturePath('file2L.json');
  const getResult = readFile('result2.txt');
  const result = genDiff(firstFile, secondFile, 'stylish');
  expect(result).toEqual(getResult);
});

test('second test long YML', () => {
  const firstFile = getFixturePath('file1L.yml');
  const secondFile = getFixturePath('file2L.yml');
  const getResult = readFile('result2.txt');
  const result = genDiff(firstFile, secondFile, 'stylish');
  expect(result).toEqual(getResult);
});

test('second test long --format plane', () => {
  const firstFile = getFixturePath('file1L.json');
  const secondFile = getFixturePath('file2L.json');
  const getResult = readFile('resultPlain.txt');
  const result = genDiff(firstFile, secondFile, 'plain');
  expect(result).toEqual(getResult);
});
