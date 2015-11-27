module.exports = function (gulp, plugins, jsFiles) {
    return function () {
        gulp.watch(['./client/app/**/**/*.scss', './client/app/**/**/**/*.scss'], ['sass']);
        gulp.watch(jsFiles, ['js']);
    };
};
