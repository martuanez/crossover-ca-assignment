module.exports = function (gulp, plugins) {
    return function (cb) {
        plugins.del.sync(['client/dist/**'], cb);
    };
};
