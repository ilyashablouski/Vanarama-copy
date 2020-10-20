const fetch = require('node-fetch');

async function fetchRewritesList() {
  let list;

  // Get list from dev S3 bucket.
  const raw = await fetch(
    'https://grid-rewrites.s3.eu-west-2.amazonaws.com/dev/rewrites.json',
  );
  const json = await raw.json();

  // Build next compatible rewrites lists.
  list = Object.keys(json.data.list).map(source => {
    return { source, destination: json.data.list[source] };
  });

  // Attach patterns.
  list = list.concat(json.patterns);

  // Remove undefined elements.
  list = list.filter(element => {
    return element !== undefined;
  });

  return list;
}

module.exports = fetchRewritesList;
