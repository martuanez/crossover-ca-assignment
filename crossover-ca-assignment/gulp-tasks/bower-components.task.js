module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./app/bower_components/**')
            .pipe(gulp.dest('client/dist/bower_components'));
    };
};
