// jest.config.js
const nextJest = require('next/jest');
const customJestConfig = require('./customJestConfig');

const createJestConfig = nextJest({
  dir: './',
});

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
