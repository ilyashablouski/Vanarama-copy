const fetch = require('node-fetch');
const csv = require('csvtojson');

// Github endpoint.
const endpoint =
  'https://raw.githubusercontent.com/Autorama/vanarama-seo/master';

// Fetch options.
const options = {
  method: 'GET',
  withCredentials: true,
  credentials: 'include',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'text/csv',
  },
};

// Fetch csv file.
const fetchList = async url => {
  const res = await fetch(url, options);
  const data = await res.text();
  const list = await csv().fromString(data);
  return list;
};

// PDP list.
const getPdpList = async () => {
  const vehicles = { car: [], lcv: [] };
  const capIds = { car: [], lcv: [] };

  // Fetch data from github.
  const pdpList = await fetchList(`${endpoint}/pdp-rewrites.csv`);

  // Extract cap ids.
  pdpList.forEach(entry => vehicles[entry.vehicle_type].push(entry.cap_id));

  // Split into chunks.
  const chunk = 50;
  let i;
  let j;

  Object.keys(vehicles).forEach(key => {
    for (i = 0, j = vehicles[key].length; i < j; i += chunk) {
      capIds[key].push(vehicles[key].slice(i, i + chunk));
    }
  });

  return capIds;
};

(async () => {
  const pdpList = await getPdpList();

  console.log(pdpList);
})();

// fetchAsync()
//   .then(data => data.filter(entry => entry.cap_id))
//   .then(data => console.log(data))

//   .catch(error => console.log(error.message));
