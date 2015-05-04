var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require("gulp-connect");


gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port: 8888
    });
});


gulp.task('css', function() {
    return gulp.src('app/less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]

        }))
        .pipe(concatCss("bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/build'))
        .pipe(connect.reload());
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src('app/js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('app/less/*.less', ['css']);
    gulp.watch('app/js/*.js', ['js']);
    gulp.watch('app/*.html', ['html']);
});

gulp.task('default', ['connect', 'watch']);

gulp.task('build', function () {
    return gulp.src('app/less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]

        }))
        .pipe(concatCss("bundle.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/build'))
});