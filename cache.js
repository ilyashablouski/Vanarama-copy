module.exports = (req, res, next) => {
  // here you can define period in second, this one is 5 minutes
  const MAX_AGE = 3600;

  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=${MAX_AGE}`);
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
