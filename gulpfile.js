// Module
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    prefix          = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    htmlinject      = require('bs-html-injector'),
    rename          = require('gulp-rename');



// Paths
var dist_Dir        = 'dist/',
    dist_DirAssets  = dist_Dir + 'assets/',
    dist_jsDir      = dist_DirAssets + 'js/',
    dist_cssDir     = dist_DirAssets + 'css/',
    dist_imageDir   = dist_DirAssets + 'images/',
    src_Dir         = 'src/',
    src_DirAssets   = src_Dir + 'assets/',
    src_jsDir       = src_DirAssets + 'js/',
    src_cssDir      = src_DirAssets + 'css/',
    src_imageDir    = src_DirAssets + 'images/',
    bowerDir        = 'bower_components/';



/**
 * Browser Sycn
 */

gulp.task('serve', function() {
  browserSync.init({
    proxy: 'boilerplate.dev'
  });

  gulp.watch(src_cssDir, [sass]);
  gulp.watch(dist_Dir + "*.html").on('change', browserSync.reload);
  gulp.watch(dist_Dir + "*.php").on('change', browserSync.reload);
  gulp.watch("js/*.js", ['js-watch']);

});



/**
 * Sass Task
 */

gulp.task('sass', function(){

  gulp.src(src_cssDir)
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_cssDir))
    .pipe(browserSync.stream());

});



/**
 * JS Task
 */

gulp.task('js', function () {
  gulp.src(src_jsDir)
    //.pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest(dist_jsDir));
});

gulp.task('js-watch', ['js'], browserSync.reload);


/**
 * Default Task
 */

gulp.task('default', [

  'serve',

]);










// Modules
// var gulp        = require('gulp'),
//     browserSync = require('browser-sync'),
//     plumber     = require('gulp-plumber'),
//     notify      = require('gulp-notify'),
//     sass        = require('gulp-ruby-sass'),
//     filter      = require('gulp-filter'),
//     concat      = require('gulp-concat'),
//     uglify      = require('gulp-uglify'),
//     minify      = require('gulp-minify-css');
//     prefix      = require('gulp-autoprefixer');
//     sourcemaps  = require('gulp-sourcemaps');

// // Paths
// var baseDir     = 'dist/',
//     assetsDir   = baseDir + 'assets/',
//     jsDir       = assetsDir + 'js/',
//     cssDir      = assetsDir + 'css/',
//     imageDir    = assetsDir + 'images/',
//     srcDir      = 'src/',
//     srcJsDir    = srcDir + 'js/',
//     srcCssDir   = srcDir + 'scss/',
//     bowerDir    = srcDir + 'bower_components/';


// /* ==========================================================================

//    Task Browser Sync

//    ========================================================================== */
// gulp.task('browser-sync', function() {
//   browserSync.init([
//     cssDir +'**/*.css',
//     baseDir + '**/*.{html,php}',
//     imageDir + '**/*.{jpg,gif,png,svg}',
//     jsDir + '**/*.js'],
//   { options: {
//       debugInfo: true,
//       watchTask: true,
//       ghostMode: {
//         clicks : true,
//         scroll : true,
//         links  : true,
//         forms  : true }
//     },
//     server: {
//       baseDir  : 'dist/'
//     },
//     //proxy: 'boilerplate.dev',
//     open: true
//   });
// });


// /* ==========================================================================

//    Task Sass

//    ========================================================================== */

// gulp.task('sass', function() {
//   gulp.src(srcCssDir + 'main.scss')
//     .pipe(plumber())
//     .pipe(sourcemaps.init())
//     .pipe(sass({sourcemap: false}))
//     .on('error', function(err) { console.log(err.message); })
//     .pipe(sourcemaps.write({includeContent: false, sourceRoot: srcDir}))
//     .pipe(sourcemaps.init({loadMaps: true}))
//     .pipe(prefix('last 1 version', '> 1%', 'ie 8'))
//     .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: srcCssDir}))
//     .pipe(gulp.dest(cssDir))
// });


// /* ==========================================================================

//    Task Scripts

//    ========================================================================== */
// gulp.task('scripts', function () {
//     // add your JS files to be combined in the correct order here
//     var concatination = [
//         bowerDir + 'fastclick/lib/fastclick.js',
//         srcJsDir + 'main.js'
//     ];

//     gulp.src(concatination)
//         .pipe(concat('all.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(jsDir));
// });


// /* ==========================================================================

//    Task Modernizr

//    ========================================================================== */
// gulp.task('modernizr', function () {
//     gulp.src(bowerDir + 'modernizr/modernizr.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(jsDir));
// });

// /* ==========================================================================

//    Task jQuery

//    ========================================================================== */
// gulp.task('jquery', function () {
//     gulp.src(bowerDir + 'jquery/dist/jquery.min.js')
//         .pipe(uglify())
//         .pipe(gulp.dest(jsDir));
// });


// /* ==========================================================================

//    Task watch

//    ========================================================================== */
// gulp.task('watch', function () {
//     gulp.watch(srcCssDir + '**/*.scss', ['sass']);
//     gulp.watch(srcJsDir + '**/*.js', ['scripts']);
// });


// /* ==========================================================================

//    Gulp Tasks

//    ========================================================================== */

// // Gulp Init
// gulp.task('init', [
//     'sass',
//     'scripts',
//     'modernizr',
//     'jquery'
// ]);

// // Gulp Default
// gulp.task('default', [
//     'browser-sync',
//     'watch'
// ]);


// // Gulp Publish