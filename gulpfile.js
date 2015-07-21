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
    modernizr       = require('gulp-modernizr'),
    rename          = require('gulp-rename'),
    del             = require('del');



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
  browserSync.init([
    // Files to watch
    dist +'**/*.{html,php}',
    distCSS +'**/*.css',
    distJS + '**/*.js'],
  { options: {
      debugInfo: true,
      watchTask: true,
      proxy: 'boilerplate.dev',
      ghostMode: {
        clicks : true,
        scroll : true,
        links  : true,
        forms  : true
      }
    }
  });
});



/**
 * Move Templates Files
 */

// gulp.task('clean:templates', function() {
//   del([
//     dist + '/**/*.php'
//   ],{
//     force: true
//   });
// });

// gulp.task('copy:templates', function() {
//   del([
//     dist + '/**/*.php'
//   ],{
//     force: true
//   });
// });

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
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(distCSS))
});



/**
 * JS Task
 */

var combineJSPlugins = [
  srcBower  + 'jquery/dist/jquery.js',
];

gulp.task('plugins', function() {
  gulp.src(combineJSPlugins)
    .pipe(concat('plugins.min.js'))
    .pipe(jshint())
    .pipe(uglify())
    .pipe(gulp.dest(distJS));
});

var combineJSScripts = [
  srcJS     + 'scripts/example.js',
];

gulp.task('scripts', function() {
  gulp.src(combineJSScripts)
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(distJS));
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
 * Watch Task
 */

gulp.task('watch', ['browser-sync'], function(){

  // Watch Sass Files
  gulp.watch(srcCSS + '**/*.scss', ['sass']);

  // Watch JS Files
  gulp.watch(srcJS + '**/*.js', [
    'scripts'
  ]);

  // Watch Template Files
  gulp.watch(srcTemplates + '**/*.php', [
    'templates'
  ]);
});



/**
 * Default Task
 */

gulp.task('default', ['watch', 'browser-sync']);