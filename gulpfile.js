var gulp = require('gulp');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var Q = require('q');
var mainBowerFiles = require('main-bower-files');

gulp.task('dist-assets', function () {
  return gulp.src(['./src/**/**/*.js', './src/**/**/*.css'].concat(mainBowerFiles()))
                .pipe(gulp.dest('./dist/assets'));
});

gulp.task('inject', ['dist-assets'], function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/assets/**/*.js', './dist/assets/**/*.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    return gulp.src('./dist', {read: false})
		.pipe(clean());
});



gulp.task('default', ['clean', 'dist-assets', 'inject']);