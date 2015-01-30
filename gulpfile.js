// "use strict";

var gulp = require('gulp');
var csso = require('gulp-csso');
var less = require('gulp-less');
var uncss = require('gulp-uncss');
var autoprefixer = require('gulp-autoprefixer');

var js1k = require("gulp-js1k");
var stripDebug = require('gulp-strip-debug');

var coffee = require('gulp-coffee');

var sourcemaps = require('gulp-sourcemaps');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');

var path = require('path');
var glob = require('glob');
var livereload = require('gulp-livereload');
var util = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');



// === templates ===========================================
var tmpl = function(arr) {
    var res = glob.sync('./public/template/*.html');

    if (arr) res = res.concat(arr);

    return res;
};

// relise ==================================================
gulp.task('relise', ['less', 'coffee'], function() {
    gulp.src(['./public/content/css/style.css'])
        .pipe(plumber({
            errorHandler: notify.onError("Error:\n<%= error %>")
        }))
        .pipe(autoprefixer({
            browsers: ['last 7 versions', '> 1%', 'ie 9'],
            cascade: false
        }))
        // .pipe(uncss({
        //     html: tmpl(['./public/content/index.php'])
        // }))
        .pipe(concat('style.css'))
        .pipe(csso())
        .pipe(gulp.dest('./public/content/css'));

    gulp.src(['./public/content/js/script.js'])
        .pipe(stripDebug())
        .pipe(js1k())
        .pipe(gulp.dest('./public/content/js'));
});

// less ====================================================
gulp.task('less', function() {
    gulp.src(['./public/content/bwr/bootstrap/less/bootstrap.less'])
        .pipe(plumber({errorHandler: notify.onError("Error:\n<%= error %>")}))
        .pipe(sourcemaps.init())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', util.log))
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(addsrc('public/content/bwr/sweetalert/lib/sweet-alert.css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/content/css'))
        .pipe(livereload());
});

// coffescript =============================================
gulp.task('coffee', function() {
    gulp.src([
            './public/content/bwr/sweetalert/lib/sweet-alert.min.js',
            './public/content/bwr/angular/angular.js',
            './public/content/bwr/angular-route/angular-route.js',
            './public/content/coffee/app.coffee',
            './public/content/coffee/factorys.coffee',
            './public/content/coffee/directives.coffee',
            './public/content/coffee/controller-MenuCtrl.coffee',
            './public/content/coffee/controller-IndexCtrl.coffee',
            './public/content/coffee/controller-AdminCtrl.coffee',
        ])
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
gulp.task('default', ['coffee', 'less']);


// Задача на отслеживание изменений ========================
gulp.task('watch', function() {
    gulp.watch(['./public/content/less/*.less'], ['less']);
    gulp.watch(['./public/content/coffee/*.coffee'], ['coffee']);
    gulp.watch('./public/template/*', ['reload']);
});