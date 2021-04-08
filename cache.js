module.exports = (req, res, next) => {
  if (process.env.ENV !== 'dev') {
    const DEFAULT_MAX_AGE = 604800;
    if (req.method === 'GET') {
      res.set(
        'Cache-control',
        `public, max-age=${DEFAULT_MAX_AGE}, s-max-age=${DEFAULT_MAX_AGE}`,
      );
    } else {
      res.set('Cache-control', `no-store`);
    }
  }

  next();
};
