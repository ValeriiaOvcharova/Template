"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cssnano = require("cssnano"),
    postcss = require('gulp-postcss'),
    del = require("del"),
    autoprefixer = require('autoprefixer'),
    imagemin = require('gulp-imagemin'),
    browsersync = require('browser-sync').create();

//BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./app"
    }
  });
  done();
}
//BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}
// Clean assets
function clean() {
  return del(["./dist/"]);
}
// Optimize Images
function images() {
  return gulp
    .src("./app/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./dist/img"));
}
// CSS task
function css() {
  return gulp
    .src("./app/sass/**/*.sass")
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./app/css/"))
    .pipe(browsersync.stream())
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./dist/css/"));
}

// Watch files
function watchFiles() {
  gulp.watch("./app/sass/**/*", css);
  gulp.watch(
    [
      "./app/*.html",
      "./app/js/*.js"
    ],
    browserSyncReload
  );
  gulp.watch("./app/img/**/*", images);
}

// define complex tasks
var build = gulp.series(clean, gulp.parallel(css, images));
var watch = gulp.parallel(watchFiles, browserSync);


// export tasks
exports.images = images;
exports.css = css;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;