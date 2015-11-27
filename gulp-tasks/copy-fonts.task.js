module.exports = function (gulp, plugins) {
    return function () {
        gulp.src([
            'client/app/bower_components/bootstrap/dist/fonts/*.{ttf,woff,woff2,eof,svg}',
            'client/app/bower_components/fontawesome/fonts/*.{ttf,woff,woff2,eof,svg}',
            'client/app/common/fonts/*.{ttf,woff,woff2,eof,svg}'
        ], {base: './'})
            .pipe(plugins.flatten())
            .pipe(gulp.dest('client/dist/fonts'));
    };
};
