const blogPosts = require('./blogPosts');

var delay = 1000;

function runQuery(callBack) {
  setTimeout(function() {
    callBack();
  }, delay);
  delay = delay + 1000;
}

runQuery(blogPosts);
