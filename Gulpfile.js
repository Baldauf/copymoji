var gulp = require('gulp')
  , sass = require('gulp-sass')
  , rename = require('gulp-rename')
  , browserSync = require('browser-sync').create()
  , gulpHelp = require('gulp-help')
  , svgSprite = require('gulp-svg-sprite');

gulp = gulpHelp(gulp);

var paths = {
  scss: 'style/scss/**/*.scss',
  scssMain: 'style/scss/main.scss',
  svg: 'svg/',
  css: 'style/css'
};

gulp.task('build-scss', 'builds the css un-minified', function() {
  return gulp.src(paths.scssMain)
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('svgsprite', function () {
  config = {
    mode  : {
      inline   : true,
      "symbol" : {
        "sprite"  : "sprite.svg"
      }
    }
  };

  gulp.src('**/*.svg', {cwd: paths.svg})
      .pipe(svgSprite(config)
        .on('error', function(e){ console.error(e) }))
      .pipe(gulp.dest(paths.svg));
})

gulp.task('watch', 'watch all scss and compile changes with livereload', function() {
  gulp.watch(paths.scss, ['build-scss'])
  gulp.watch(paths.svg + '**/*.svg', ['svgsprite'])
});

gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("**/*.html").on('change', browserSync.reload);
})