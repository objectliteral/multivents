var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    istanbul = require('gulp-istanbul'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha'),
    jsdoc = require('gulp-jsdoc3'),
    gzip = require('gulp-gzip'),
    rollup = require('rollup-stream'),
    source = require('vinyl-source-stream'),
    umd = require('gulp-umd');

gulp.task('lint', function () {
    return gulp.src('./multivents.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('pre-test', [ 'build' ], function () {
    return gulp.src('./dist/multivents.umd.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', [ 'pre-test' ], function () {
    return gulp.src('./tests/*.js')
        .pipe(mocha({ reporter: 'progress' }))
        .pipe(istanbul.writeReports({ reporters: [ 'text', 'html' ] }));
});

gulp.task('rollup', function () {
    return rollup({
        entry: './src/multivents.js',
        format: 'cjs'
    })
    .pipe(source('multivents.umd.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('umd', function () {
    return gulp.src('./src/multivents.js')
        .pipe(rename('multivents.umd.js'))
        .pipe(umd({
            exports: function (file) {
                return 'Channel';
            },
            templateName: 'returnExports',
            namespace: function () {
                return 'Channel';
            }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', [ 'rollup' ], function () {
    return gulp.src('./dist/multivents.umd.js')
        .pipe(rename('multivents.umd.min.js'))
        .pipe(sourcemaps.init())
            .pipe(uglify())
        .pipe(sourcemaps.write('./', {includeContent:false}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', [ 'build' ], function () {
    return gulp.src('./dist/multivents.umd.min.js')
        .pipe(gzip())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('docs', function () {
    return gulp.src([''])
        .pipe(jsdoc(require('./jsdoc.json')));
});

gulp.task('default', [ 'lint', 'test', 'build', 'compress', 'docs' ]);
