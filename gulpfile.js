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
    changed         = require('gulp-changed'),
    del             = require('del');



// Paths
var src             = '___src/',
    srcAssets       = src + 'assets/',
    srcJS           = srcAssets + 'js/',
    srcCSS          = srcAssets + 'css/',
    srcFonts        = srcAssets + 'fonts/',
    srcImages       = srcAssets + 'images/',
    srcDummy        = src + 'dummy/',
    srcTemplates    = src + 'templates/',
    srcBower        = src + 'bower/',
    dist            = '___dist/',
    distAssets      = dist + 'assets/',
    distJS          = distAssets + 'js/',
    distCSS         = distAssets + 'css/',
    distFonts       = distAssets + 'fonts/',
    distImages      = distAssets + 'images/',
    distDummy       = dist + 'dummy/';


// Options
var autoprefixerOptions = ['last 2 version', '> 1%'];



/*------------------------------------*\

  #NOTHING TO CHANGE HERE DUDE

\*------------------------------------*/


/**
 * Error Handling
 */

var onError = function(err) {
    console.log(err);
}



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
 * Copy Fonts
 */

gulp.task('copy:fonts', function() {
  gulp.src(srcFonts + '**/*.{ttf,woff,eof,svg,eot}')
    .pipe(gulp.dest(distFonts))
    .pipe(notify({ message: 'Fonts task complete' }));
});



/**
 * Image Task
 */

gulp.task('images', function() {
  gulp.src(srcImages + '**/*')
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(changed(distImages))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest(distImages))
    .pipe(notify({ message: 'Images task complete' }));
});


/**
 * Move Templates Files
 */

gulp.task('templates', function(){
  gulp.src(srcTemplates + '**/*.php')
    .pipe(gulp.dest(dist))
    .pipe(notify({ message: 'Templates task complete' }));
});



/**
 * Move Dummy Files
 */

gulp.task('dummy', function(){
  gulp.src(srcDummy + '**/*.{php,html}')
    .pipe(gulp.dest(distDummy))
    .pipe(notify({ message: 'Dummy task complete' }));
});



/**
 * Sass Task
 */

gulp.task('sass', function(){
  gulp.src(srcCSS + '*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
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
    .pipe(notify({ message: 'Sass task complete' }));
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
    .pipe(gulp.dest(distJS))
    .pipe(notify({ message: 'Plugins task complete' }));
});

var combineJSScripts = [
  srcJS     + 'scripts/example.js',
];

gulp.task('scripts', function() {
  gulp.src(combineJSScripts)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest(distJS))
    .pipe(notify({ message: 'Scripts task complete' }));
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
    .pipe(gulp.dest(distJS + 'vendor/'))
    .pipe(notify({ message: 'Copyscripts task complete' }));
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
    .pipe(gulp.dest(distJS + 'vendor/'))
    .pipe(notify({ message: 'Modernizr task complete' }));
});



/**
 * Cleaning Tasks
 */

// Images
gulp.task('clean:images', function(cb) {
  del([
    distImages
  ], cb);
});


// Templates
gulp.task('clean:templates', function(cb) {
  del([
    dist + '**/*.php'
  ], cb);
});

// Fonts
gulp.task('clean:fonts', function(cb) {
  del([
    distFonts
  ], cb);
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
  'modernizr',
  'copy:fonts',
  'images'
]);



/**
 * Watch Task
 */

gulp.task('watch', ['browser-sync'], function(){

  // Watch Sass Files
  gulp.watch(srcCSS + '**/*.scss', ['sass']);

  // Watch JS Files
  gulp.watch(srcJS + '**/*.js', ['scripts']);

  // Watch Template Files
  gulp.watch(srcTemplates + '**/*.php', ['templates']);

  // If an image is modified, run our images task to compress images
  gulp.watch(srcImages + '**/*', ['images']);

});



/**
 * Default Task
 */

gulp.task('default', ['watch', 'browser-sync']);