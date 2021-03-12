module.exports = (req, res, next) => {
  const DEFAULT_MAX_AGE = 604800;

  if (req.originalUrl.includes('-leasing/')) {
    res.set('Cache-control', 'max-age=300, stale-while-revalidate=30');
  } else if (req.method === 'GET') {
    res.set(
      'Cache-control',
      `public, max-age=${DEFAULT_MAX_AGE}, s-max-age=${DEFAULT_MAX_AGE}`,
    );
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
