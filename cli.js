"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const csv = require("fast-csv");
const path = require("path");
const utils_1 = require("./utils");
const inputFilePath = '.' + path.normalize('/' + process.argv[2]);
if (!inputFilePath) {
    throw new Error('No input file path specified');
}
fs.createReadStream(inputFilePath)
    .pipe(csv.parse({ headers: true }))
    .pipe(csv.format({
    headers: true,
    quoteColumns: { json: true },
    quoteHeaders: false
}))
    .transform(utils_1.transformCsvTables)
    .pipe(process.stdout)
    .on('end', process.exit);
