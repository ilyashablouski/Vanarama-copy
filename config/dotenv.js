const dotenv = require('dotenv');

module.exports = () => {
  const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
  return dotenv.config({ path });
};
