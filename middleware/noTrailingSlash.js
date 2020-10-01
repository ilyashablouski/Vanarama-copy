// 301 redirect from trailing slash to no trailing slash.
const noTrailingSlashMiddleware = (req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else next();
};

module.exports = noTrailingSlashMiddleware;
