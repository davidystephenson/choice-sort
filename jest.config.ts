import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts'
  ],
  bail: true,
  // Enable garbage collection between tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Expose garbage collection to Node.js
  testEnvironmentOptions: {
    node: {
      options: '--expose-gc'
    }
  },
  // Force Jest to exit cleanly
  forceExit: true,
  // Detect open handles that prevent Jest from exiting
  detectOpenHandles: true,
  // Log heap usage to monitor memory
  logHeapUsage: true,
  // Limit workers to reduce memory overhead
  maxWorkers: 1

}

export default config
