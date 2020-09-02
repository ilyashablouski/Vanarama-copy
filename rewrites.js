// const csv = require('csv-parser');
// const fs = require('fs');
const fetch = require('node-fetch');
const { Readable } = require('stream');

const csv = require('csvtojson');

const results = [];

const url =
  'https://raw.githubusercontent.com/Autorama/vanarama-seo/master/pdp-rewrites.csv?token=AAODSWH6XAFCM6HSRVCRZ2S7K43YE';

fetch(url)
  .then(res => res.text())
  .then(text => {
    const stream = Readable.from(text);

    stream.pipe(csv()).then(json => console.log(json));

    // csv()
    //   .fromStream(stream)
    //   .subscribe(
    //     json => {
    //       return new Promise((resolve, reject) => {
    //         results.push(json);
    //       });
    //     },
    //     // onError,
    //     // onComplete,
    //   );

    console.log(results);
  });

// request(url)
//   .pipe(csvStream)
//   .on('error', err => {
//     console.error(err);
//   })
//   .on('data', data => {
//     results.push(data);
//     // const capIds = data.filter(entry => {
//     //   return entry.cap_id;
//     // });

//     // console.log(results);
//   });

// console.log('list', list);

// // module.exports = getList;
