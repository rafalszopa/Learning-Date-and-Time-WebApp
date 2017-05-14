var gulp = require('gulp');
var sass = require('gulp-sass');
var render = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();

gulp.task('nunjucks', function() {
  return gulp.src('app/templates/!(_)*.html')
  .pipe(render({
      path: ['app/templates']
    }))
  .pipe(gulp.dest('app/'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('sass', function() {
  return gulp.src('app/scss/styles.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass', 'nunjucks'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/templates/*.html', ['nunjucks']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload);
  //gulp.watch('app/templates/*.html', browserSync.reload);
});