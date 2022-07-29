const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
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

function jsTask(path, target){
    return () => src(path)
        .pipe(sourcemaps.init())
        .pipe(concat(target))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('assets'));
}

const planoSunJs = jsTask('src/scripts/plano_sun/**/*.js', 'plano-sun.js');

function watchTask(){
    watch(['src/styles/*.scss', 'src/scripts/plano_sun/**/*.js'], { interval: 1000 }, parallel(compilescss, planoSunJs))
}


exports.planoSunJs = planoSunJs;
exports.compilescss = compilescss;
exports.default = series(
    parallel(planoSunJs, compilescss),
    watch
);