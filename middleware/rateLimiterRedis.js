require('dotenv').config({ path: '.env.secret' });
require('dotenv').config();

const redis = require('redis');
const { RateLimiterRedis } = require('rate-limiter-flexible');

let rateLimiterMiddleware;

if (process.env.ENV === 'prod') {
  const redisClient = redis.createClient({
    host: process.env.REDIS_CACHE_HOST,
    port: process.env.REDIS_CACHE_PORT,
    enable_offline_queue: false,
  });

  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: process.env.REDIS_KEY_PREFIX,
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
  });

  rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
      });
  };
} else rateLimiterMiddleware = false;

module.exports = rateLimiterMiddleware;
