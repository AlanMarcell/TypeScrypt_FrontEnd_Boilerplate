var gulp = require('gulp');
var plumber = require('gulp-plumber');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({
    lazy: 'true'
});

gulp.task('vet', function () {
    log('Analyzing source with JSHint');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('css', function () {
    log('Compile SASS --> CSS');
    return gulp
        .src(config.compass)
        .pipe(plumber())
        .pipe($.compass({
            config_file: './config.rb',
            css: config.css,
            sass: config.sass
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.css));
});

gulp.task('clean-styles', function () {
    var files = config.css;
    clean(files);
});

gulp.task('css-w', ['css'], function () {
    gulp.watch([config.compass], ['css']);
});

////////////////////////
function clean(path) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.orange(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.green(msg));
    }
}