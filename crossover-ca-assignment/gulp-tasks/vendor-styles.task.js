module.exports = function (gulp, plugins) {
    return function () {
        gulp.src([
            './client/app/bower_components/bootstrap/dist/css/bootstrap.min.css',
            './client/app/bower_components/fontawesome/css/font-awesome.min.css',
            './client/app/bower_components/angular-toastr/dist/angular-toastr.min.css',
            './client/app/bower_components/ngImgCrop/compile/minified/ng-img-crop.css'
        ])
            .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
            .pipe(plugins.minifyCss())
            .pipe(plugins.concat('vendor.css'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/css/'))
            .pipe(plugins.livereload());

    };
};
