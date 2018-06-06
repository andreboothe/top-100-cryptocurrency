'use strict'

// Dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const changed = require('gulp-changed');

// SASS to CSS
const SCSS_SRC = './src/assets/scss/**/*.scss';
const SCSS_DEST = './src/assets/css';

// Compile SCSS
gulp.task('compile_scss', () => {

    gulp.src(SCSS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({suffix : '.min'}))
    .pipe(changed(SCSS_DEST))
    .pipe(gulp.dest(SCSS_DEST));
});

// Detect changes in scss
gulp.task('watch_scss', () =>{
    gulp.watch(SCSS_SRC, ['compile_scss']);
});

// run task
gulp.task('default', ['watch_scss']);
