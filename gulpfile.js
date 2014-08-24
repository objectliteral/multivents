var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha');

gulp.task('hint', function () {
    gulp.src('./minivents.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('test', [], function () {
  gulp.src('./test.js')
      .pipe(mocha());
});

gulp.task('build', [], function () {
    gulp.src('./minivents.js')
      .pipe(rename('minivents.min.js'))
      .pipe(sourcemaps.init())
        .pipe(uglify())
      .pipe(sourcemaps.write('./', {includeContent:false}))
      .pipe(gulp.dest('./'));
  });

gulp.task('default', [ 'hint', 'test', 'build' ], function () {
  
});
