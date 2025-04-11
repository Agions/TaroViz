module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@taroviz$': '<rootDir>/packages/all/src',
    '^@taroviz/core(.*)$': '<rootDir>/packages/core/src$1',
    '^@taroviz/adapters(.*)$': '<rootDir>/packages/adapters/src$1',
    '^@taroviz/charts(.*)$': '<rootDir>/packages/charts/src$1',
    '^@taroviz/themes(.*)$': '<rootDir>/packages/themes/src$1',
    '^@taroviz/data(.*)$': '<rootDir>/packages/data/src$1',
    '^@taroviz/hooks(.*)$': '<rootDir>/packages/hooks/src$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx}',
    '!packages/*/src/**/*.d.ts',
    '!packages/*/src/**/*.stories.{ts,tsx}',
    '!packages/*/src/**/__tests__/**/*'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
};
