const fetch = require('node-fetch');
const csv = require('csvtojson');

const client = require('../../src/utils/client');
const SLUGS = require('./slugs.gql.js');

// const inspect = require('../inspect');

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
async function fetchList(url) {
  const res = await fetch(url, options);
  const data = await res.text();
  const list = await csv().fromString(data);
  return list;
}

function reduceVehiclesToChunks(array, chunk) {
  return array.reduce((result, currentValue, index) => {
    const updatedResult = [...result];

    if (index % chunk === 0) {
      updatedResult.push([currentValue]);
    } else {
      updatedResult[updatedResult.length - 1].push(currentValue);
    }

    return updatedResult;
  }, []);
}

async function getVehiclelist() {
  const list = await fetchList(`${endpoint}/pdp-rewrites.csv`);

  return list;
}

function reduceVehiclesByVehicleType(list) {
  return list.reduce(
    (result, currentValue) => {
      const updatedResult = { ...result };

      if (currentValue.vehicle_type === 'car') {
        updatedResult.car.push(currentValue.cap_id);
      } else if (currentValue.vehicle_type === 'lcv') {
        updatedResult.lcv.push(currentValue.cap_id);
      }

      return updatedResult;
    },
    { car: [], lcv: [] },
  );
}

async function getDerivatives(vehicleGroupList, vehicleGroupType) {
  const result = await client.query({
    query: SLUGS,
    variables: {
      ids: vehicleGroupList,
      vehicleType: vehicleGroupType.toUpperCase(),
    },
  });
  if (result && result.data) {
    return result.data.derivatives;
  }
  return [];
}

function buildListOfRewrites(derivatives, rawList) {
  // Loop through every derivative.
  return derivatives.map(derivative => {
    let destination;
    // Set to url.
    switch (derivative.vehicleType) {
      case 'CAR':
        destination = `/car-leasing/${derivative.manufacturer.slug}/${derivative.range.slug}/${derivative.bodyStyle.slug}/${derivative.slug}`;
        break;
      case 'LCV':
        destination = `/van-leasing/${derivative.manufacturer.slug}/${derivative.model.slug}/${derivative.slug}`;
        break;
      default:
    }

    const source = rawList.filter(
      entry =>
        entry.cap_id === derivative.id &&
        entry.vehicle_type === derivative.vehicleType.toLowerCase(),
    )[0].legacy_url;

    return { source, destination };
  });
}

async function resolveAllPromises(listOfPromises) {
  return new Promise((resolve, reject) => {
    Promise.all(listOfPromises)
      .then(values => {
        resolve(values);
      })
      .catch(err => reject(err));
  });
}

async function getPdpRewiteList() {
  const CHUNK_SIZE = 50;

  // Get list from github.
  const rawList = await getVehiclelist();

  // Split list per vehicle type.
  const vehicleList = reduceVehiclesByVehicleType(rawList);

  const chunkedVehicles = {
    car: reduceVehiclesToChunks(vehicleList.car, CHUNK_SIZE),
    lcv: reduceVehiclesToChunks(vehicleList.lcv, CHUNK_SIZE),
  };

  // Get cars promises.
  const carsPromises = chunkedVehicles.car.map(chunk => {
    return getDerivatives(chunk, 'car');
  });

  // Get lcvs promises.
  const lcvsPromises = chunkedVehicles.lcv.map(chunk => {
    return getDerivatives(chunk, 'lcv');
  });

  // Resolve all promises.
  const vehiclePromisesResults = await resolveAllPromises([
    ...carsPromises,
    ...lcvsPromises,
  ]);

  // Flat.
  const derivatives = vehiclePromisesResults.reduce(
    (result, currentValue) => [...result, ...currentValue],
    [],
  );

  const rewrites = buildListOfRewrites(derivatives, rawList);

  return rewrites;
}

module.exports = {
  reduceVehiclesToChunks,
  reduceVehiclesByVehicleType,
  buildListOfRewrites,
  getPdpRewiteList,
};
