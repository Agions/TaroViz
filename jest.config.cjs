module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  maxWorkers: '50%',
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.(spec|test).(ts|tsx)'],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/index.(ts|tsx)',
  ],
  coverageThreshold: {
    global: {
      branches: 4,
      functions: 5,
      lines: 9,
      statements: 9,
    },
  },
  transform: {
    '^.+\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
  testPathIgnorePatterns: ['/dist/', '/packages/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(echarts|zrender)/)',
  ],
};
