var gulp = require('gulp');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var babel = require('gulp-babel');
var mainBowerFiles = require('main-bower-files');


gulp.task('clean', function() { // remove 'dist' folder
    return gulp.src('./dist', {read: false})
		.pipe(clean());
});

gulp.task('dist-index', ['clean'], function(){ // move index.html to the 'dist' folder
  return gulp.src(['./src/index.html'])
                .pipe(gulp.dest('./dist/'));
});

gulp.task('dist-assets', ['dist-index'], function () { // move assets to the 'dist' folder
  return gulp.src(['./src/**/**/*.js', './src/**/**/*.css'].concat(mainBowerFiles()))
                .pipe(gulp.dest('./dist/assets'));
});

gulp.task('babel', function() {
  return gulp.src('./dist/**/main.js')
                .pipe(babel({presets: ['es2015']}))
                .pipe(gulp.dest('./dist'));
});

gulp.task('inject', ['dist-assets'], function () {
  var target = gulp.src('./dist/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src(['./dist/assets/**/*.js', './dist/assets/**/*.css'], {read: false});
  return target.pipe(inject(sources, {ignorePath: '/dist'}))
    .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['clean', 'dist-index', 'dist-assets', 'inject']);