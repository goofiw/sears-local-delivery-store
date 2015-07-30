var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    browserify = require('gulp-browserify'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    bower = require('gulp-bower');


var config = {
  bowerDir: './bower_components'
}

gulp.task('styles', function(){
  return sass('src/styles/main.scss', {style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/scripts'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

gulp.task('scripts', ['clean'], function() {
    return gulp.src(['src/js/app.js'])
        .pipe(browserify({
          insertGlobals: true,
          debug: true
        }))
        .pipe(concat('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({Message: 'Script task complete'}))
});

gulp.task('jsmain', ['clean'], function() {
        return gulp.src('src/js/main/*')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'jsmain task complete'}))

});
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('views', function(){
  gulp.src('views/default.jade')
  .pipe(jade())
  .pipe(gulp.dest('dist/'));

  gulp.src('views/partials/**/*')
  .pipe(jade())
  .pipe(gulp.dest('dist/views/'));
})

gulp.task('clean', function(cb) {
  del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  //watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  //watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  //watch image files
  gulp.watch('src/images/**/*', ['images']);

  //autoreload on change to dist
  livereload.listen();
  gulp.watch(['dist/**', 'views/*.jade']).on('change', livereload.changed);
});

gulp.task('start', function() {
  nodemon({ script: 'index.js',
    ext: 'js jade html',
    env: { 'NODE_ENV': 'development' },
    execMap: { js:'node --harmony' }
  });
})

