'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')(),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path'),
    webpackConfig = require('./webpack.config'),
    webpack = require('webpack'),
    gutil = require("gulp-util"),
    order = require('gulp-order'),
    concat = require('gulp-concat'),
    size = require('gulp-size'),
    gulpWebpack = require('gulp-webpack'),
    run = require('run-sequence'),
    webserver = require('gulp-webserver');


var config = new (function () {
    this.source = '';
    this.startUpTsFile = this.source + 'app/main.ts'
    this.sourceApp = this.source + 'app';

    this.allJavaScript = [this.tsOutputPath + '/**/*.js'];
    this.allTypeScript = this.sourceApp + '/**/*.ts';
    this.typings = this.source + 'app/typings';
    this.libraryTypeScriptDefinitions = this.typings + '/**/*.ts';
    this.appTypeScriptReference = this.typings + '/tagw.d.ts';

    this.buildPath = this.source + 'build';
    this.tsOutputPath = this.buildPath + '/app';
    this.tsOutputPathForLibs = this.buildPath + '/libs';
})();


// this tells gulp to combine my Angular dependencies and to output the vendor.js file into the dist/ folder
gulp.task("vendor", function () {
    return gulp.src([
        'node_modules/angular-route/angular-route.js',
        'node_modules/angular/angular.js',
        'node_modules/angular-cookies/angular-cookies.js',
        'node_modules/underscore/underscore.js'
    ])
        .pipe(order([
            'angular/angular.js',
            'angular-route/angular-route.js',
            'angular-cookies/angular-cookies.js',
            'underscore/underscore.js',
            'jquery/dist/jquery.js'
        ], { base: './node_modules' }))
        .pipe(concat('vendor.js'))
        .pipe(size())
        .pipe(gulp.dest('dist/'))
});


// this tells gulp to take the index.js file and send it to Webpack along with the config and put the resulting files in dist/
gulp.task("webpack", ['vendor', 'copyIndex'], function (cb) {
    gulp.src('./build/app/main.js')
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest('dist/'));
    cb();
});

gulp.task("copyIndex", function () {
    return gulp.src(['index.html'])
        .pipe(gulp.dest('dist/'));
});



/**
 * Generates the app.d.ts references file dynamically from all application *.ts files.
 */
gulp.task('scripts:refs', ['scripts:clnts'], function () {
    var target = gulp.src(config.appTypeScriptReference);
    var sources = gulp.src([config.allTypeScript, config.startUpTsFile], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {

            if (filepath.indexOf('tagw.d.ts') >= 0) return;
            
            return '/// <reference path="../../' + filepath + '" />';
        }
    })).pipe(gulp.dest(config.typings));
});

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('scripts:cplts', ['scripts:refs'], function (cb, err) {

    var sourceTsFiles = [config.appTypeScriptReference, //reference to app.d.ts files
        config.allTypeScript,                //path to typescript files
        config.libraryTypeScriptDefinitions, //reference to library .d.ts files
    ];

    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc({
            target: 'ES5',
            declaration: false,
            module: 'commonjs',
            noExternalResolve: true
        }));

    tsResult.dts.pipe(gulp.dest(config.tsOutputPath));

    tsResult.js.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.tsOutputPath));

    gulp.src([config.source + 'app/**/*', '!app/**/*.ts']).pipe(gulp.dest(config.tsOutputPath));

    gulp.src(['index.html']).pipe(gulp.dest(config.buildPath));

    cb(err);
});


/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('scripts:clnts', function (cb, err) {
    var typeScriptGenFiles = [config.buildPath, 'build'];

    gulp.src(typeScriptGenFiles, { read: false })
        .pipe(clean());
    cb(err);
});

gulp.task('start', function() {
  gulp.src('dist')
    .pipe(webserver({
      livereload: false,
      open: true
    }));
});