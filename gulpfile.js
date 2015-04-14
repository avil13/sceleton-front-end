// "use strict";

var gulp = require('gulp');
var csso = require('gulp-csso');
var less = require('gulp-less');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');

var jsmin = require('gulp-jsmin');
var stripDebug = require('gulp-strip-debug');

var coffee = require('gulp-coffee');

var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');

var path = require('path');
var glob = require('glob');
var livereload = require('gulp-livereload');
var util = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');


// === files ===============================================
var files = {
    js: [
        './public/content/bwr/sweetalert/lib/sweet-alert.min.js',
        './public/content/bwr/angular/angular.js',
        './public/content/bwr/angular-route/angular-route.js',
        './public/content/coffee/app.coffee',
        './public/content/coffee/factorys.coffee',
        './public/content/coffee/directives.coffee',
        './public/content/coffee/controller-MenuCtrl.coffee',
        './public/content/coffee/controller-IndexCtrl.coffee',
        './public/content/coffee/controller-AdminCtrl.coffee',
    ],
    css: [
        './public/content/bwr/sweetalert/lib/sweet-alert.css',
        './public/content/less/my_style.less'
    ]
};



// === templates ===========================================
var tmpl = function(arr) {
    var res = glob.sync('./public/template/*.html');

    if (arr) res = res.concat(arr);

    return res;
};

// relise ==================================================
gulp.task('relise', function() {
    gulp.src(files.css)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', util.log))
        .pipe(autoprefixer({
            browsers: ['last 7 versions', '> 1%', 'ie 9'],
            cascade: false
        }))
        // .pipe(uncss({
        //     html: tmpl(['./public/content/index.php'])
        // }))
        .pipe(csso())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/css'))
        .pipe(livereload());


    gulp.src(files.js)
        .pipe(plumber({
            errorHandler: notify.onError("Error:\n<%= error %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(gulpif(/[.]coffee$/, coffee({
            bare: true
        })))
        .pipe(stripDebug())
        // .pipe(js1k())
        .pipe(concat('script.js'))
        .pipe(jsmin())
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/js'))
        .pipe(livereload());
});


// less ====================================================
gulp.task('css', function() {
    gulp.src(files.css)
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', util.log))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/css'))
        .pipe(livereload());
});


// coffescript =============================================
gulp.task('js', function() {
    gulp.src(files.js)
        .pipe(plumber({
            errorHandler: notify.onError("Error:\n<%= error %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(gulpif(/[.]coffee$/, coffee({
            bare: true
        })))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/js'))
        .pipe(livereload());
});


// =========================================================
// Livereload
gulp.task('reload', function() {
    livereload();
});


// =========================================================
// Запуск задач
gulp.task('default', ['js', 'css']);


// Задача на отслеживание изменений ========================
gulp.task('watch', function() {
    gulp.watch(['./public/content/less/*.less'], ['css', 'reload']);
    gulp.watch(['./public/content/coffee/*.coffee'], ['js', 'reload']);
    gulp.watch('./public/template/*', ['reload']);
});