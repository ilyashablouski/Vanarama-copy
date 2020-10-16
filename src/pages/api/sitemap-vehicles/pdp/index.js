const client = require('../../../../utils/client');
const URLS = require('./urls.gql.js');

// const inspect = require('../../../../../inspect');

async function getPdpUrls(first, after) {
  const result = await client.query({
    query: URLS,
    variables: {
      first,
      after,
    },
  });
  if (result?.data) {
    return result.data.vehicleConfigurationUrls;
  }
  return [];
}

async function resolvePromises(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then(values => {
        resolve(values);
      })
      .catch(err => reject(err));
  });
}

async function getQueryResults() {
  const CHUNK_SIZE = 500;
  let after;
  let pdpUrls = [];
  let urlPromiseResults;
  let hasNextPage;

  // Loop until there isn't a next page.
  do {
    // Get url promises.
    const urlPromise = getPdpUrls(CHUNK_SIZE, after);

    // Resolve all promises.
    // eslint-disable-next-line no-await-in-loop
    urlPromiseResults = await resolvePromises(urlPromise);

    hasNextPage = urlPromiseResults?.pageInfo?.hasNextPage;
    after = urlPromiseResults?.pageInfo?.endCursor;

    // inspect(urlPromiseResults);

    // Merge results with previous.
    pdpUrls = pdpUrls.concat(urlPromiseResults.edges);
  } while (hasNextPage);

  return pdpUrls;
}

async function buildPdpSitemapList(rawList) {
  const urlList = rawList.map(entry => {
    // Legacy url.
    if (entry.node.legacy) return { url: entry.node.url };

    // Cars.
    if (entry.node.vehicleType === 'CAR') {
      return {
        url: `/car-leasing${entry.node.url}`,
      };
    }

    // Pickups
    if (entry.node.bodyStyle === 'Pickup') {
      return {
        url: `/pickup-leasing${entry.node.url}`,
      };
    }

    // Vans.
    return {
      url: `/van-leasing${entry.node.url}`,
    };
  });

  return urlList;
}

async function getPdpSitemapList() {
  const rawList = await getQueryResults();
  const results = await buildPdpSitemapList(rawList);

  return results;
}

module.exports = {
  buildPdpSitemapList,
  getPdpSitemapList,
};
