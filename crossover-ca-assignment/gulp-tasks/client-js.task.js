module.exports = function (gulp, plugins, jsFiles) {
    return function () {
        gulp.src(jsFiles)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            .pipe(plugins.order([
                'client/app/common/**/*.module.js',
                'client/app/core/**/*.module.js',
                'client/app/app.js',
                'client/app/core/**/**/*.js'
            ], {base: '.'}))
            .pipe(plugins.concat('client.js'))
            .pipe(plugins.sourcemaps.write())
            //.pipe(plugins.hash())
            .pipe(gulp.dest('./client/dist/js/'))
            .pipe(plugins.livereload());
    };
};
