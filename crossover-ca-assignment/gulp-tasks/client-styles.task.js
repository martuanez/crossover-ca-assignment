module.exports = function (gulp, plugins) {
    return function () {
        plugins.sass(['client/app/main.scss'], {
            sourcemap: true,
            compass: true,
            loadPath: [
                'client/app/common/styles',
                'client/app/core/landing/styles',
                'client/app/core/latest/styles',
                'client/app/core/thread/styles',
                'client/app/core/categories/styles',
                'client/app/common/components/header/styles',
                'client/app/common/components/footer/styles'
            ]
        })
            .on('error', function (err) {
                console.error('Error', err.message);
            })
            .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(plugins.minifyCss())
            .pipe(plugins.concat('client.css'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/css/'))
            .pipe(plugins.livereload());
    };
};