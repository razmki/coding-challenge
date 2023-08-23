"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCsvTables = exports.rotateMatrix = exports.checkIsValidJsonString = void 0;
const checkIsValidJsonString = (str) => {
    try {
        const json = JSON.parse(str);
        return typeof json === 'object';
    }
    catch (e) {
        return false;
    }
};
exports.checkIsValidJsonString = checkIsValidJsonString;
const rotateMatrix = (countRows, array) => {
    let m = countRows;
    let n = countRows;
    let row = 0;
    let col = 0;
    let prev;
    let curr;
    const matrix = [];
    for (let i = 0; i < array.length; i += countRows) {
        const chunk = array.slice(i, i + countRows);
        matrix.push(chunk);
    }
    while (row < m && col < n) {
        if (row + 1 === m || col + 1 === n)
            break;
        prev = matrix[row + 1][col];
        for (let i = col; i < n; i++) {
            curr = matrix[row][i];
            matrix[row][i] = prev;
            prev = curr;
        }
        row++;
        for (let i = row; i < m; i++) {
            curr = matrix[i][n - 1];
            matrix[i][n - 1] = prev;
            prev = curr;
        }
        n--;
        if (row < m) {
            for (let i = n - 1; i >= col; i--) {
                curr = matrix[m - 1][i];
                matrix[m - 1][i] = prev;
                prev = curr;
            }
        }
        m--;
        if (col < n) {
            for (let i = m - 1; i >= row; i--) {
                curr = matrix[i][col];
                matrix[i][col] = prev;
                prev = curr;
            }
        }
        col++;
    }
    return JSON.stringify(matrix.flat()).replace(/,/g, ', ');
};
exports.rotateMatrix = rotateMatrix;
const transformCsvTables = (row, next) => {
    const { id, json } = row;
    if ((0, exports.checkIsValidJsonString)(json)) {
        const matrixSingleArray = JSON.parse(json);
        const countRows = Math.sqrt(matrixSingleArray.length);
        const is_valid = Number.isInteger(countRows);
        next(null, {
            id,
            json: is_valid ? (0, exports.rotateMatrix)(countRows, matrixSingleArray) : '[]',
            is_valid,
        });
    }
    else {
        next(new Error(`Unable to parse json for ID:${row.id}`));
    }
};
exports.transformCsvTables = transformCsvTables;
