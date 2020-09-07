const fetch = require('node-fetch');
const csv = require('csvtojson');

const vehicles = { car: [], lcv: [] };
const capIds = { car: [], lcv: [] };

// Github endpoint
const url =
  'https://0ae40ce80020c5131ffdbcf0983d7a231d117d3e@raw.githubusercontent.com/Autorama/vanarama-seo/master/pdp-rewrites.csv';

// Fetch options
const options = {
  method: 'GET',
  withCredentials: true,
  credentials: 'include',
  headers: {
    Authorization: 'Bearer 0ae40ce80020c5131ffdbcf0983d7a231d117d3e',
    'Content-Type': 'text/csv',
  },
};

const fetchList = async () => {
  const res = await fetch(url, options);
  const data = await res.text();
  const list = await csv().fromString(data);
  return list;
};

(async () => {
  // Fetch data from github.
  const list = await fetchList();

  // Extract cap ids.
  list.forEach(entry => vehicles[entry.vehicle_type].push(entry.cap_id));

  // Split into chunks.
  const chunk = 50;
  let i;
  let j;

  Object.keys(vehicles).forEach(key => {
    for (i = 0, j = vehicles[key].length; i < j; i += chunk) {
      capIds[key].push(vehicles[key].slice(i, i + chunk));
    }
  });

  console.log(capIds);
})();

// fetchAsync()
//   .then(data => data.filter(entry => entry.cap_id))
//   .then(data => console.log(data))

//   .catch(error => console.log(error.message));
