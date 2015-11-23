var Parse = require('parse/node').Parse,
    appKey = "yxPJx5ySs8SWgumIEs2JfYVsI1OTU6MtN2C1iG8U",
    javascriptKey = "3t3byCFpjKO6RL48enhDucH7ETGtNAaxuUcJgTi6";

Parse.initialize(appKey, javascriptKey);

module.exports = Parse;