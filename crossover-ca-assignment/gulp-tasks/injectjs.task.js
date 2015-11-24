module.exports = function (gulp, plugins, jsFiles, jsLibs) {
    var sources = jsLibs.concat(jsFiles);
    function transform(filepath) {
        filepath = filepath.replace('/client/', '');
        // Use the default transform as fallback:
        return plugins.inject.transform.apply(plugins.inject.transform, arguments);
    }
    return function () {
        gulp.src('./client/app/index.html')
            .pipe(plugins.inject(gulp.src(sources, {read: false}), {name: 'js', transform: transform}))
            .pipe(gulp.dest('./client'));
    };
};
