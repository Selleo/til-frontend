const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
const customJestConfig = {
  resetMocks: false,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!*.config.js',
    '!.eslintrc.js',
    '!**coverage/**',
    '!**lib/**',
    '!**/styles/**',
    '!**/tests/**',
    '!**/store/*.js',
    '!**/nonAuthenticated/**',
    '!**/src/*.js',
  ],

  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '\\.svg': '<rootDir>/src/tests/__mocks__/svg.js',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest'],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
module.exports = createJestConfig(customJestConfig)
