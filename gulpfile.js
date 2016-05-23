var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
 
gulp.task('TASKNAME', function() {
    return gulp.src(mainBowerFiles())
        .pipe(/* what you want to do with the files */)
}); 

gulp.task('index', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(mainBowerFiles(), {read: false});
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});