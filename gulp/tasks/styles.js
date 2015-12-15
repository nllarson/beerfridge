var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var config = require('../config.js').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings)).on('error', sass.logError)
    .pipe(rename(config.rename))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dest))
    .pipe(connect.reload());
});
