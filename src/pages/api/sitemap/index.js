import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req, res) => {
  const stream = new SitemapStream({
    hostname: 'https://priver.dev',
  });

  stream.write({
    url: '/',
  });

  stream.end();

  const sitemap = await streamToPromise(stream).then(sm => sm.toString());

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};
