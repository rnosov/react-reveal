const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const flatten = require('gulp-flatten');
const replace = require('gulp-replace');

gulp.task('build', () =>
  gulp.src('./src/**/*.js')
    .pipe(flatten())
    .pipe(replace("from './lib/", "from './"))
    .pipe(replace("from '../Reveal';", "from './Reveal';"))
    .pipe(replace("from '../lib/globals';", "from './globals';"))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('./'))
);

gulp.task('clean', function () {
  return gulp.src([
    './index.js',
    './Animation.js',
    './Stepper.js',
    './Step.js',
    './globals.js',
    './debounce.js',
    './Bounce.js',
    './Fade.js',
    './Flash.js',
    './HeadShake.js',
    './Jello.js',
    './Jump.js',
    './Pulse.js',
    './Roll.js',
    './RubberBand.js',
    './Shake.js',
    './Slide.js',
    './Swing.js',
    './Tada.js',
    './Wobble.js',
    './Flip.js',
    './Reveal.js',
    './Rotate.js',
    './LightSpeed.js',
    './Spin.js',
    './Zoom.js',
  ], {read: false}).pipe(clean());
});
