import nextJest from 'next/jest'

const createJestConfig = nextJest({
    dir: './',
})

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapping: {
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/pages/(.*)$': '<rootDir>/pages/$1',
        '^@/types/(.*)$': '<rootDir>/types/$1',
        '^@/services/(.*)$': '<rootDir>/services/$1',
        '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)