import parseFile from './src/utils/parceFile.js';
import buildTree from './src/utils/buildTree.js';
import outputFormatter from './src/utils/outputFormatter.js';

import formatOutputConstants from './src/constants/formatOutputConstants';

const genDiff = (firstFilepath, secondFilepath, outputFormat = formatOutputConstants.stylish) => {
  const [firstFile, secondFile] = [firstFilepath, secondFilepath].map(parseFile);
  const tree = buildTree(firstFile, secondFile);
  return outputFormatter(tree, outputFormat);
};
export default genDiff;
