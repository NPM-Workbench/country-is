module.exports = {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(msw|@mswjs|until-async)/)',
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
    '!src/types/index.ts'
  ],
  coverageProvider: 'v8'
};
