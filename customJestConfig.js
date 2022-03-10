module.exports = {
  testPathIgnorePatterns: ['./cypress/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!(@vanarama)/)'],
  setupFiles: ['dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^core/(.*)': '<rootDir>/src/core/$1',
  },
  coverageDirectory: './.coverage',
  testResultsProcessor: 'jest-sonar-reporter',
  clearMocks: true,
  testTimeout: 30000,
  testEnvironment: 'jest-environment-jsdom',
};
