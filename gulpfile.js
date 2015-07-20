// Module
var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    plumber         = require('gulp-plumber'),
    notify          = require('gulp-notify'),
    sass            = require('gulp-sass'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    autoprefixer    = require('gulp-autoprefixer'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    htmlinject      = require('bs-html-injector'),
    jshint          = require('gulp-jshint'),
    rename          = require('gulp-rename');



// Paths
var src             = '___src/',
    srcAssets       = src + 'assets/',
    srcJS           = srcAssets + 'js/',
    srcCSS          = srcAssets + 'css/',
    srcDummy        = src + 'dummy/',
    srcTemplates    = src + 'templates/',
    srcBower        = src + 'bower/',
    dist            = './',
    distAssets      = dist + 'assets/',
    distJS          = distAssets + 'js/',
    distCSS         = distAssets + 'css/',
    distDummy       = dist + 'dummy/';


// Options
var autoprefixerOptions = ['last 2 version', '> 1%'];



/*------------------------------------*\

  #NOTHING TO CHANGE HERE DUDE

\*------------------------------------*/



/**
 * BrowserSync Proxy
 */

gulp.task('browser-sync', function(){
  browserSync.init({
    options: {
      proxy: "boilerplate.dev"
    }
  });
});



/**
 * BrowserSync reload all Browsers
 */

gulp.task('browser-sync-reload', function () {
    browserSync.reload();
});



/**
 * Move Templates Files
 */

gulp.task('templates', function(){
  gulp.src(srcTemplates + '**/*.php')
    .pipe(gulp.dest(dist));
});



/**
 * Move Dummy Files
 */

gulp.task('dummy', function(){
  gulp.src(srcDummy + '**/*.{php,html}')
    .pipe(gulp.dest(distDummy));
});



/**
 * Sass Task
 */

gulp.task('sass', function(){
  gulp.src(srcCSS + '*.scss')
    .pipe(plumber())
    .pipe(rename({ suffix: '.min'}))
    .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'compressed',
        precision: 10
      }))
      .pipe(autoprefixer({
        browsers: autoprefixerOptions
      }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(distCSS))
    .pipe(browserSync.reload({ stream:true }));
});



/**
 * JS Task
 */

var combinejs = [
  // srcBower  + 'jquery/dist/jquery.js',
  // srcJS     + 'plugins/form.js',
  // srcJS     + 'plugins/lightbox.js',
  // srcJS     + 'plugins/stacks.js',
  srcJS     + 'plugins/stage.js',
];

gulp.task('scripts', function() {
  gulp.src(combinejs)
    .pipe(concat('all.min.js'))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest(distJS));
});


/**
 * Watch Task
 */

gulp.task('watch', ['browser-sync'], function(){

  // Watch Sass Files
  gulp.watch(srcCSS + '*.scss', ['sass']);

  // Watch JS Files
  gulp.watch(srcJS + '**/*.js', [
    'scripts',
    'browser-sync-reload'
  ]);


  // Watch Template Files
  gulp.watch(srcTemplates + '**/*.php', [
    'templates',
    'browser-sync-reload'
  ]);
});



/**
 * Default Task
 */

gulp.task('default', ['watch']);