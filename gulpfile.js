var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');

gulp.task('dist-assets', function () {
  return gulp.src(['./src/**/*.js', './src/**/*.css'].concat(mainBowerFiles()))
                .pipe(gulp.dest('./dist/assets'));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/**/**/*.js', './dist/**/**/*.css'], {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./dist'));
});



gulp.task('default', ['dist-assets', 'inject']);