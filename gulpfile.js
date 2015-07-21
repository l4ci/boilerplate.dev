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
    modernizr       = require('gulp-modernizr');
    rename          = require('gulp-rename');



// Paths
var src             = '___src/',
    srcAssets       = src + 'assets/',
    srcJS           = srcAssets + 'js/',
    srcCSS          = srcAssets + 'css/',
    srcDummy        = src + 'dummy/',
    srcTemplates    = src + 'templates/',
    srcBower        = src + 'bower/',
    dist            = '___dist/',
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

var combineJSScripts = [
  srcBower  + 'jquery/dist/jquery.js',
];

gulp.task('scripts', function() {
  gulp.src(combineJSScripts)
    .pipe(concat('scripts.min.js'))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest(distJS));
});

var combineJSPlugins = [
  srcJS     + 'plugins/example.js',
];

gulp.task('plugins', function() {
  gulp.src(combineJSPlugins)
    .pipe(concat('app.min.js'))
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
    'plugins',
    'browser-sync-reload'
  ]);


  // Watch Template Files
  gulp.watch(srcTemplates + '**/*.php', [
    'templates',
    'browser-sync-reload'
  ]);
});



/**
 * Copy Scripts
 */

var copyThisScripts = [
  srcBower  + 'modernizr/modernizr.js',
];

gulp.task('copyscripts', function() {
  gulp.src(copyThisScripts)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest(distJS + 'vendor/'));
});



/**
 * Modernizr
 */

var modernizrTests = [
  'cssanimations',
  'csstransforms',
  'csstransforms3d',
  'csstransitions',
  'backgroundblendmode',
  'bgsizecover',
  'preserve3d',
  'flexbox',
  'touch',
  'svg',
  'inlinesvg',
  'respond',
  'hsla',
  'rgba',
  'webgl'
];

gulp.task('modernizr', function() {
  gulp.src([srcCSS + '**/*.scss', srcJS + '**/*.js'])
    .pipe(modernizr({
      crawl: false,
      options : [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testAllProps',
        'fnBind'
      ],
      tests: modernizrTests
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '-custom.min'}))
    .pipe(gulp.dest(distJS + 'vendor/'));
});



/**
 * Init Task
 */

gulp.task('init', [
  'sass',
  'scripts',
  'plugins',
  'templates',
  'dummy',
  'copyscripts',
  'modernizr'
]);



/**
 * Default Task
 */

gulp.task('default', ['watch']);