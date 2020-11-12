const { version } = require('./package.json');

module.exports = (app, _options, next) => {
  // App status.
  app.register(async instance => {
    instance.get('/status', async (_req, reply) => {
      const statusCode = 200;
      reply.code(statusCode);

      return {
        statusCode,
        nodeEnv: process.env.NODE_ENV,
        nodeVersion: process.version,
        appVersion: version,
      };
    });
  });

  // Env.
  app.register(async instance => {
    instance.get('/env', async (_req, reply) => {
      const statusCode = 200;
      reply.code(statusCode);

      return process.env;
    });
  });

  next();
};
