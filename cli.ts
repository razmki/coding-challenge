import * as fs from 'fs';
import * as csv from 'fast-csv';
import * as path from 'path';

import {
  transformCsvTables,
  InputCsvRow,
  OutputCsvRow
} from './utils';

const inputFilePath = '.' + path.normalize('/' + process.argv[2]);
if (!inputFilePath) {
  throw new Error('No input file path specified');
}

fs.createReadStream(inputFilePath)
  .pipe(csv.parse({ headers: true }))
  .pipe(csv.format<InputCsvRow, OutputCsvRow>({ 
    headers: true,
    quoteColumns: { json: true },
    quoteHeaders: false
  }))
  .transform(transformCsvTables)
  .pipe(process.stdout)
  .on('end', process.exit);
  