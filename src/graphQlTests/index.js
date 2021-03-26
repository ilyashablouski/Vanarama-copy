const blogPosts = require('./blogPosts');
const blogPost = require('./blogPost');
const genericPage = require('./genericPage');
const pageCollection = require('./pageCollection');
const vehicleList = require('./vehicleList');
const productCard = require('./productCard');
const homePage = require('./homePage');
const carDerivatives = require('./carDerivatives');
const vehicleImages = require('./vehicleImages');
const filterList = require('./filterList');
const quoteByCapId = require('./quoteByCapId');
const getTrimAndColor = require('./getTrimAndColorList');

let delay = 1000;

function runQuery(callBack) {
  setTimeout(function() {
    callBack();
  }, delay);
  delay += 1000;
}

runQuery(blogPosts);
runQuery(blogPost);
runQuery(genericPage);
runQuery(pageCollection);
runQuery(vehicleList);
runQuery(productCard);
runQuery(homePage);
runQuery(carDerivatives);
runQuery(vehicleImages);
runQuery(filterList);
runQuery(quoteByCapId);
runQuery(getTrimAndColor);
