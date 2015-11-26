var Parse = require('../lib/parse/parse');

function signup(username, password, email) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    return user.signUp();
}


module.exports = {
    signup: signup
};
