module.exports = function (gulp, plugins) {
    var vendorFiles = [
        'client/app/bower_components/jquery/dist/jquery.min.js',
        'client/app/bower_components/angular/angular.min.js',
        'client/app/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',

        'client/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',

        'client/app/bower_components/angulartics/dist/angulartics.min.js',
        'client/app/bower_components/angulartics-mixpanel/dist/angulartics-mixpanel.min.js',
        'client/app/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
        'client/app/bower_components/angular-ui-mask/dist/mask.js',
        'client/app/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
        'client/app/vendor-scripts/retina.js'
    ];
    return function () {
        gulp.src(vendorFiles)
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            //.pipe(plugins.order(vendorFiles), {base: '.'})
            //.pipe(plugins.debug())
            .pipe(plugins.concat('vendor.js'))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('./client/dist/js/'))
            .pipe(plugins.livereload());
    };
};
