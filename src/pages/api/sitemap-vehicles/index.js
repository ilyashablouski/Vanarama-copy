import { SitemapStream, streamToPromise } from 'sitemap';
import moment from 'moment';

const { getPdpSitemapList } = require('./pdp');

// const inspect = require('../../../../inspect');

export default async (req, res) => {
  const pdpUrls = await getPdpSitemapList();

  const stream = new SitemapStream({
    hostname: process.env.HOSTNAME,
    lastmodDateOnly: true,
  });

  // Pdp.
  pdpUrls.forEach(entry =>
    stream.write({
      url: entry.url,
      changefreq: 'daily',
      priority: 0.5,
      lastmod: moment().toISOString(),
    }),
  );

  stream.end();

  const sitemap = await streamToPromise(stream).then(sm => sm.toString());

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
};
