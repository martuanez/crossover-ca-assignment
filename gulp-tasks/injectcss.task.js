module.exports = function (gulp, plugins) {
    function transform(filepath) {
        filepath = filepath.replace('/client/', '');
        // Use the default transform as fallback:
        return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    }
    return function () {
        gulp.src('./client/app/styles.html')
            .pipe(plugins.inject(gulp.src('client/dist/css/vendor-*.css', {read: false}), {name: 'vendorcss', transform: transform}))
            .pipe(plugins.inject(gulp.src('client/dist/css/tutors-*.css', {read: false}), {name: 'tutorscss', transform: transform}))
            .pipe(gulp.dest('./client/dist'));
    };
};
