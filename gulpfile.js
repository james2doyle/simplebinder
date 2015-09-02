/* global require */
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var header = require('gulp-header');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');

var now = new Date();
// Create an array with the current month, day and time
var date = [
now.getMonth() + 1,
now.getDate(),
now.getFullYear()
].join('/');

var banner = ['/*!',
' * <%= pkg.title || pkg.name %> - <%= pkg.description %>',
' * @version v<%= pkg.version %>',
' * @link <%= pkg.homepage %>',
' * @license <%= pkg.license %>',
' * @copyright (c) <%= date %> <%= pkg.author.name %> (<%= pkg.author.url %>)',
' */',
''].join('\n');

var data = {
  pkg : pkg,
  date: date
};

gulp.task('concat', function() {
  gulp.src('src/scripts/*.js')
  .pipe(concat('script.js'))
  .pipe(gulp.dest('js/'))
  .pipe(livereload());
});

gulp.task('cssmin', function () {
  gulp.src('css/style.css')
  .pipe(cssmin())
  .pipe(header(banner, data))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('css/'));
});

gulp.task('sass', function () {
  gulp.src('src/styles/*.scss')
  .pipe(sass())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('css/'))
  .pipe(livereload());
});

gulp.task('autoprefixer', function () {
  gulp.src('css/style.css')
  .pipe(autoprefixer({
    browsers: ['last 4 versions', 'ie 8', 'ie 9'],
    cascade: false,
    remove: false // keep unneeded prefixes
  }))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('css/'));
});

gulp.task('uglify', function() {
  gulp.src(['simplebinder.js', 'js/*.js'])
  .pipe(uglify())
  .pipe(header(banner, data))
  .pipe(concat('script.min.js'))
  .pipe(gulp.dest('js/'));
});

gulp.task('reload', function() {
  gulp.src('**/*.{php,html}')
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('**/*.{php,html}', ['reload']);
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('src/scripts/*.js', ['concat']);
});

gulp.task('build', function() {
  gulp.src('simplebinder.js')
  .pipe(uglify())
  .pipe(header(banner, data))
  .pipe(concat('simplebinder.min.js'))
  .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify'], function() {
  // fired before 'finished' event
});