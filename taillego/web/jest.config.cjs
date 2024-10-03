/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.+(test|spec).+(ts|tsx|js)'],
  moduleNameMapper: {
    "^lodash-es$": "lodash"
  }
};