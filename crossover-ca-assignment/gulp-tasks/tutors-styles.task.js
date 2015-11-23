module.exports = function (gulp, plugins) {
    return function () {
        plugins.sass(['client/app/main.scss'], {
            sourcemap: true,
            compass: true,
            loadPath: [
                'client/app/common/styles',
                'client/app/core/landing/styles',
                'client/app/core/ambassador/styles',
                'client/app/core/tutor/styles',
                'client/app/core/landing/components/how-tutors-work/styles',
                'client/app/core/landing/components/sample-profiles/styles',
                'client/app/common/components/header/styles',
                'client/app/common/components/footer/styles',
                'client/app/common/components/sign-up/styles',
                'client/app/common/components/action-card/styles',
                'client/app/common/components/login/styles',
                'client/app/common/components/picture-select/styles',
                'client/app/common/components/phone-modal/styles'
            ]
        })
            .on('error', function (err) {
                console.error('Error', err.message);
            })
            .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(plugins.minifyCss())
            .pipe(plugins.concat('tutors.css'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/css/'))
            .pipe(plugins.livereload());
    };
};