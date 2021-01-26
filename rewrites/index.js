const fetch = require('node-fetch');

async function fetchRewritesList() {
  let list;

  // Get list from dev S3 bucket.
  const raw = await fetch(
    'https://devstatic.vanarama-nonprod.com/rewrites/rewrites.json',
  );
  const json = await raw.json();

  // Build next compatible rewrites lists.
  list = Object.keys(json.data.list).map(source => {
    return { source, destination: json.data.list[source] };
  });

  // Attach patterns.
  list = list.concat(json.data.patterns);

  return list;
}

module.exports = fetchRewritesList;
