var gulp = require('gulp');
var config = require('../config.js').fonts;

gulp.task('fonts', function() {
  gulp.src(config.src)
      .pipe(gulp.dest(config.dest));
});