module.exports = function (gulp, plugins) {
    return function () {
        plugins.sass(['client/app/main.scss'], {
            sourcemap: true,
            compass: true,
            loadPath: [
                'client/app/common/styles',
                'client/app/core/topics/styles',
                'client/app/core/topic/styles',
                'client/app/core/categories/styles',
                'client/app/common/components/header/styles',
                'client/app/common/components/login-signup-modal/styles',
                'client/app/common/components/user-avatar/styles',
                'client/app/common/components/category-item/styles',
                'client/app/common/components/categories-dropdown/styles'
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