var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    stylish = require('jshint-stylish'),
    mocha = require('gulp-mocha');

gulp.task('hint', function () {
    gulp.src('./multivents.js')
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
});

gulp.task('test', [], function () {
  gulp.src('./test.js')
      .pipe(mocha());
});

gulp.task('build', [], function () {
    gulp.src('./multivents.js')
      .pipe(rename('multivents.min.js'))
      .pipe(sourcemaps.init())
        .pipe(uglify())
      .pipe(sourcemaps.write('./', {includeContent:false}))
      .pipe(gulp.dest('./'));
  });

gulp.task('default', [ 'hint', 'test', 'build' ]);
