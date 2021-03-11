module.exports = (req, res, next) => {
  const MAX_AGE = 604800;

  if (req.method === 'GET') {
    res.set(
      'Cache-control',
      `public, max-age=${MAX_AGE}, s-max-age=${MAX_AGE}`,
    );

    if (req.originalUrl.includes('-leasing/')) {
      res.set(
        'Cache-control',
        `public, max-age=300, s-max-age=300, must-revalidate`,
      );
    }
  } else {
    res.set('Cache-control', `no-store`);
  }

  next();
};
