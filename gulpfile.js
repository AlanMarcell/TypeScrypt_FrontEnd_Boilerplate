var gulp = require('gulp');
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

gulp.task('css', ['clean-styles'], function () {
    log('Compile SASS --> CSS');
    return gulp.src(config.compass)
        .pipe($.compass({
            config_file: './config.rb',
            css: 'src/css',
            sass: 'src/sass'
        }))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '> 5%']
        }))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function (done) {
    var files = config.temp + ' **/*.css';
    clean(files, done);
});


////////////////////////
function clean(path, done) {
    log('Cleaning ' + $.util.colors.blue(path));
    del(path, done);
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
    console.log(msg);
}