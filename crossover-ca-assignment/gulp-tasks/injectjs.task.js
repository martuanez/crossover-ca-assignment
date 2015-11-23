module.exports = function (gulp, plugins) {
    function transform(filepath) {
        filepath = filepath.replace('/client/', '');
        // Use the default transform as fallback:
        return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    }
    return function () {
        gulp.src('./client/app/scripts.html')
            .pipe(plugins.inject(gulp.src('client/dist/js/vendor.js', {read: false}), {name: 'vendorjs', transform: transform}))
            .pipe(plugins.inject(gulp.src('client/dist/js/tutors-*.js', {read: false}), {name: 'tutorsjs', transform: transform}))
            .pipe(plugins.inject(gulp.src('client/dist/html/tutor-templates.js', {read: false}), {name: 'templates', transform: transform}))
            .pipe(gulp.dest('./client/dist'));
    };
};
