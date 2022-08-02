const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const flatten = require('gulp-flatten');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');
const {src, series, parallel, dest, watch} = gulp;

function compilescss() {
    return src('src/styles/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifycss())
        .pipe(dest('assets'))
};

function jsTask(){
    return src('src/scripts/**/**/*.js', { nodir: true })
        .pipe(terser())
        .pipe(flatten())
        .pipe(dest('assets'));
}

function watchTask(){
    watch(['src/styles/*.scss', 'src/scripts/**/**/*.js'], { interval: 1000 }, parallel(compilescss, jsTask))
}

exports.default = series(
    parallel(compilescss, jsTask),
    watchTask
);