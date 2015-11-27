module.exports = function (gulp, plugins) {
    return function () {
        gulp.src([
            'client/app/core/**/**/*.html',
            'client/app/core/**/**/**/**/*.html',
            'client/app/common/components/**/**/*.html',
            '!client/app/bower_components/**'])
            .pipe(plugins.html2js({outputModuleName: 'tutors.templates'}))
            .pipe(plugins.concat('tutor-templates.js'))
            .pipe(gulp.dest('client/dist/html'))
            .pipe(plugins.livereload());
    };
};
