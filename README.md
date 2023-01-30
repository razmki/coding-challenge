
# Rotation tables

## Requirements
  - Node.js >= v16.16.0

## Installation and Running

```sh
npm install
npm run build
node cli.js input.csv > output.csv
```

`npm test` - run tests

## Questions-Answers

##### Does it handle all the cases, including differing numbers of rows and columns, bigger and smaller tables, error cases you might come up with?

It handles bigger and small tables, also checks is valid `json` column in csv input file.

About different numbers rows and columns: As I see in documentation `"[2, -0]", "[2, -5, -5]", "[1, 1, 1, 1, 1]"` represents matrix with different number of columns and rows and result of that is empty array. 
Also, in that case I can't understand exactly number of columns and rows. The different option of them make different array result. For example, `"[1, 2, 3, 4, 5, 6]"` there can be rows and columns as 2x3 `[[1,2,3], [4,5,6]]` or 3x2 `[[1,2], [3,4], [5,6]]` and result of rotation will be `[4,1,2,5,6,3] (2x3)` and `[3,1,5,2,6,4] (3x2)`

##### For the cases you are handling, are you handling them correctly?

I'm handling cases on sample data presented in task documentation. The result output the same in the documentation.

##### Did you test against sample data? If so, please include it alongside your code.

Yes, sample data file stored in the root directory.

##### Did you write unit tests?

Yes, for running unit test please run `npm test`

