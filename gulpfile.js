var gulp = require ('gulp');
var sass = require('gulp-sass');
var uglify = require ('gulp-uglify');
var pump   = require('pump');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

//Watch 
gulp.task('styles', function (){
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));

});

gulp.task('default', function (){
	gulp.watch('sass/**/*.scss', ['styles']);
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

gulp.task('cssmin', function () {
    gulp.src('css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});