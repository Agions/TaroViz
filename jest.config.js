module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.(spec|test).(ts|tsx)'],
  collectCoverageFrom: [
    'packages/*/src/**/*.(ts|tsx)',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/index.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
};
