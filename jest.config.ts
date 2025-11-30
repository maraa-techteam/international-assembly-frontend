import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },

  // Ignore Playwright tests
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/', '/.next/'],

  // Only match files in __tests__ directory
  testMatch: ['**/tests/unit/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
}

export default createJestConfig(config)
