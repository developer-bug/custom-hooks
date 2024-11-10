/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
