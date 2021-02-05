module.exports = (req, res, next) => {
  const MAX_AGE = 3600;

  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${MAX_AGE}`);
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
