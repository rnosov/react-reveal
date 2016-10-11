const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('build', () =>
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);
