var Parse = require('parse/node').Parse,
    appKey = "yxPJx5ySs8SWgumIEs2JfYVsI1OTU6MtN2C1iG8U",
    javascriptKey = "3t3byCFpjKO6RL48enhDucH7ETGtNAaxuUcJgTi6",
    restApiKey = "1p5P5D15BR0iqzu8gSjd9soEUYTdwM7jLyiAn6Z9";

Parse.initialize(appKey, javascriptKey);

var ParseRestAPI = require('node-parse-api').Parse;

var options = {
    app_id: appKey,
    api_key: restApiKey
};

global.ParseRestApi = new ParseRestAPI(options);
global.Parse = Parse;

module.exports = Parse;