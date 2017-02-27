var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({
    lazy: 'true'
});

gulp.task('compass', function () {
    gulp.src('./src/**/*.scss')
        .pipe($.compass({
            config_file: './config.rb',
            css: 'src/css',
            sass: 'src/sass'
        }))
        .pipe(gulp.dest('dist/css'));
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

////////////////////////
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