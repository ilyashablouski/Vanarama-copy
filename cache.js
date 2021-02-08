module.exports = (req, res, next) => {
  const MAX_AGE = 604800;

  if (req.method === 'GET') {
    res.set(
      'Cache-control',
      `public, max-age=${MAX_AGE}, s-max-age=${MAX_AGE}`,
    );
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
