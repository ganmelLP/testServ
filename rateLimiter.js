module.exports = function(app) {
var rateLimiter = require('rate-limiter-flexible')
const Redis = require('ioredis');
const redisClient = new Redis({ enableOfflineQueue: false });


const rateLimiterRedis = new RateLimiterRedis({
  storeClient: redisClient,
  points: 10, // Number of points
  duration: 1, // Per second
});

const rateLimiterMiddleware = (req, res, next) => {
   rateLimiterRedis.consume(req.ip)
      .then(() => {
          next();
      })
      .catch(_ => {
          res.status(429).send('Too Many Requests');
      });
   };

   app.use(rateLimiterMiddleware);

}