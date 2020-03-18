module.exports = () => {
  const dotenv = require('dotenv');
  const envFile = process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : '.env';
  return dotenv.config({ path: envFile });
};
