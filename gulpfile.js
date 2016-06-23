var gulp = require ('gulp');
var sass = require('gulp-sass');
var uglify = require ('gulp-uglify');
var pump   = require('pump');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        logPrefix: 'Your Project',
        host:      'http://localhost:9000/gulp-tutorial/',
       
    });

    gulp.watch("sass/**/*.scss", ['sass']);
    gulp.watch("./*.php").on('change', browserSync.reload);
});

gulp.task('uglify', function (cb) {
  pump([
       	gulp.src('js/**/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

// gulp.task('default', function (){
// 	gulp.watch('sass/**/*.scss', ['styles']);
// });
gulp.task('sass', function() {
    return gulp.src("sass/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('cssmin', function () {
    gulp.src('css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});