//importações
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const browserSync = require('browser-sync').create()
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

//compila o SASS (.scss)
function compileSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

//concatenar arquivos .js e converter códigos modernos
function gulpJs() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

//Set BrowserSync - Criação de servidor local
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

//Set watch - Executor automatico de tasks
function watch() {
    gulp.watch('scss/*.scss', compileSass)
    gulp.watch('*.html').on('change', browserSync.reload)

    gulp.watch('js/scripts/*.js', gulpJs)
}

//Chamada das funções
gulp.task('default', compileSass)
gulp.task('alljs', gulpJs)
gulp.task('browserSync', browser)
gulp.task('watch', watch)
gulp.task('default', gulp.parallel('watch', 'browserSync', 'alljs'))
