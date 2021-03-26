const blogPosts = require('./blogPosts');

let delay = 1000;

function runQuery(callBack) {
  setTimeout(function() {
    callBack();
  }, delay);
  delay += 1000;
}

runQuery(blogPosts);
