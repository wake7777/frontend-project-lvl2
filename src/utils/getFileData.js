import fs from 'fs';
import path from 'path';

export default (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');
