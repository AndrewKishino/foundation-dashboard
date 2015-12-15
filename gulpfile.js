(function() {

  'use strict';

  /**
   * Requirements
   */
  var gulp   = require('gulp');
  var autoprefixer = require('gulp-autoprefixer');
  var cssmin = require('gulp-cssmin');
  var header = require('gulp-header');
  var jshint = require('gulp-jshint');
  var mocha = require('gulp-mocha');
  var notify = require('gulp-notify');
  var pkg = require('./package.json');
  var rename = require('gulp-rename');
  var sass = require('gulp-sass');
  var shell = require('gulp-shell');
  var stylish = require('jshint-stylish');

  /**
   * Banner
   */
  var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');

  /**
   * Paths
   */

  var paths = {
    sass: ['./client/sass/**/*.scss'],
    scripts: ['./gulpfile.js', './client/**/*.js', '!./client/lib/**/*.js', './server/**/*.js']
  };

  var sassPaths = [
    './client/lib/foundation-sites/scss',
    './client/lib/motion-ui/src'
  ];

  /**
   * CSS compilation
   */
  gulp.task('styles', function() {
    return gulp.src(paths.sass)
      .pipe(sass({
        includePaths: sassPaths,
        outputStyle: 'expanded'
      }))
      .on('error', notify.onError({
        title: 'Error compiling Sass',
        message: 'Check the console for info'
      }))
      .on('error', sass.logError)
      .pipe(autoprefixer())
      .pipe(rename({
        extname: '.css'
      }))
      .pipe(gulp.dest('./client'))
      .pipe(cssmin())
      .pipe(header(banner, {pkg: pkg}))
      .pipe(rename({
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(gulp.dest('./client'));
  });

  /**
   * Styles watcher
   */
  gulp.task('watchStyles', function() {
    gulp.watch(paths.sass, ['styles']);
  });

  /**
   * JavaScript linting
   */
  gulp.task('lint', function() {
    return gulp.src(paths.scripts)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail'))
      .on('error', notify.onError({
        title: 'JS hint failed',
        message: 'Check the console for errors'
      }));
  });

  /**
   * JavsScript watcher
   */
  gulp.task('watchScripts', function() {
    gulp.watch(paths.scripts, ['lint']);
  });

  /**
   * Final tasks - these are the tasks that should be run from the command line,
   * as they encompass the above.
   */
  gulp.task('default', ['styles', 'lint', 'watchStyles', 'watchScripts']);
  gulp.task('styles:dev', ['styles', 'watchStyles']);
  gulp.task('scripts:dev', ['lint', 'watchScripts']);

})();
