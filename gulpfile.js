/* eslint-disable */

var { src, dest, parallel, series } = require('gulp'),
    uglify = require('gulp-uglify'),
    eslint = require('gulp-eslint'),
    istanbul = require('gulp-istanbul'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    mocha = require('gulp-mocha'),
    jsdoc = require('gulp-jsdoc3'),
    gzip = require('gulp-gzip'),
    umd = require('gulp-umd');

const lint = function () {
    return src('./multivents.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
};

const wrapUmd = function () {
    return src('./multivents.js')
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
        .pipe(dest('./dist'));
};

const build = series(wrapUmd, function () {
    return src('./dist/multivents.umd.js')
        .pipe(rename('multivents.umd.min.js'))
        .pipe(sourcemaps.init())
            .pipe(uglify())
        .pipe(sourcemaps.write('./', {includeContent:false}))
        .pipe(dest('./dist/'));
});

const compress = series(build, function () {
    return src('./dist/multivents.umd.min.js')
        .pipe(gzip())
        .pipe(dest('./dist/'));
});

const preTest = series(build, function () {
    return src('./dist/multivents.umd.js')
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

const test = series(preTest, function () {
    return src('./tests/*.js')
        .pipe(mocha({ reporter: 'progress' }))
        .pipe(istanbul.writeReports({ reporters: [ 'text', 'html' ] }));
});

const docs = function () {
    return src(['multivents.js'])
        .pipe(jsdoc(require('./jsdoc.json')));
};

exports.lint = lint;
exports.test = test;
exports.build = build;
exports.compress = compress;
exports.docs = docs;
exports.default = parallel(lint, test, compress, docs);
