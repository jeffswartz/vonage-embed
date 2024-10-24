/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  clearMocks: true,
  moduleDirectories: ['ts', 'tsx', 'node_modules'],
  coverageProvider: 'v8',
  roots: ['<rootDir>/'],
  testMatch: ['**/tests/**/*.+(ts|tsx)', '**/?(*.)+(test).+(ts|tsx)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true,
      },
    ],
  },
};
