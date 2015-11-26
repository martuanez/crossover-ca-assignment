var gulp = require('gulp');
var path = require('path');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins({
    pattern: ['gulp-*', 'gulp.*', 'del', 'concat', 'run-*'],
    rename: {
        'gulp-ruby-sass': 'sass',
        'gulp-concat-util': 'concat',
        'gulp-hash-filename': 'hash'
    },
    lazy: false
});
var jsFiles = [
    'client/app/**/*.module.js',
    'client/app/app.js',
    'client/app/*.js',
    'client/app/**/*.js',
    'client/app/**/**/*.js',
    'client/app/**/**/**/*.js',
    'client/app/**/**/**/**/*.js',
    '!client/app/bower_components/**',
    '!client/app/external_components/**'
];
var jsLibs = [
    'client/external_components/parse-1.6.7.min.js',
    'client/bower_components/jquery/dist/jquery.min.js',
    'client/bower_components/angular/angular.min.js',
    'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'client/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
    'client/bower_components/textAngular/dist/textAngular-rangy.min.js',
    'client/bower_components/textAngular/dist/textAngular.min.js',
    'client/bower_components/textAngular/dist/textAngular-sanitize.min.js'
];

function getTask(task) {
    return require('./gulp-tasks/' + task + '.task')(gulp, plugins, jsFiles, jsLibs);
}

gulp.task('lint', getTask('lint'));

gulp.task('clean', getTask('clean'));

gulp.task('vendor-styles', getTask('vendor-styles'));

gulp.task('client-styles', getTask('client-styles'));

gulp.task('vendor-js', getTask('vendor-js'));

gulp.task('client-js', getTask('client-js'));

gulp.task('html2js', getTask('html2js'));

gulp.task('copy-fonts', getTask('copy-fonts'));

gulp.task('watch', getTask('watch'));

gulp.task('injectjs', getTask('injectjs'));

gulp.task('injectcss', getTask('injectcss'));

gulp.task('connect', function () {
    plugins.connect.server({root: 'app/', port: 8888});
});

gulp.task('connectDist', function () {
    plugins.connect.server({root: 'dist/', port: 9999});
});

// main build task
gulp.task('build',
    [/*'lint',*/ 'clean', 'vendor-styles', 'client-styles', 'vendor-js', 'client-js', 'html2js', 'copy-fonts']
);

gulp.task('start', ['build'], function () {
    plugins.nodemon({
        script: 'server.js',
        ext: 'js html scss',
        env: {'NODE_ENV': 'development'},
        tasks: function (changedFiles) {
            var tasks = [];
            console.log('changed file!');
            changedFiles.forEach(function (file) {
                if (path.extname(file) === '.js' && !~tasks.indexOf('lint')) tasks.push('lint');
                if (path.extname(file) === '.scss' && !~tasks.indexOf('client-styles')) tasks.push('client-styles');
            });
            return tasks;
        }
    });
});
gulp.task('default', function () {
    plugins.nodemon({
        script: 'server.js'
        , ext: 'js html scss'
        , env: {'NODE_ENV': 'development'}
    });
});