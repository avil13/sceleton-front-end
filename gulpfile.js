// "use strict";

var $          = require('gulp-load-plugins')();
var gulp       = require('gulp');
var stripDebug = require('gulp-strip-debug');

var glob = require('glob');
var path = require('path');


// === files ===============================================
var files = {
    js: [
        './public/content/assets/bwr/sweetalert/lib/sweet-alert.min.js',
        './public/content/assets/bwr/angular/angular.js',
        './public/content/assets/bwr/angular-route/angular-route.js',
        './public/content/assets/coffee/app.coffee',
        './public/content/assets/coffee/factorys.coffee',
        './public/content/assets/coffee/directives.coffee',
        './public/content/assets/coffee/controllers/controller-MenuCtrl.coffee',
        './public/content/assets/coffee/controllers/controller-IndexCtrl.coffee',
        './public/content/assets/coffee/controllers/controller-AdminCtrl.coffee'
    ],
    css: [
        './public/content/assets/bwr/sweetalert/lib/sweet-alert.css',
        './public/content/assets/less/my_style.less'
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
        .pipe($.sourcemaps.init())
        .pipe($.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', $.util.log))
        .pipe($.autoprefixer({
            browsers: ['last 7 versions', '> 1%', 'ie 9'],
            cascade: false
        }))
        .pipe($.uncss({
            html: tmpl(['./public/index.html'])
        }))
        .pipe($.csso())
        .pipe($.concat('style.css'))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/css'))
        .pipe($.livereload());

    gulp.src(files.js)
        .pipe($.plumber({
            errorHandler: $.notify.onError("Error:\n<%= error %>")
        }))
        .pipe($.sourcemaps.init())
        .pipe($.if(/[.]coffee$/, $.coffee({
            bare: true
        })))
        .pipe(stripDebug())
        .pipe($.concat('script.js'))
        .pipe($.jsmin())
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/js'))
        .pipe($.livereload());
});


// less ====================================================
gulp.task('css', function() {
    gulp.src(files.css)
        .pipe($.sourcemaps.init())
        .pipe($.less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }).on('error', $.util.log))
        .pipe($.concat('style.css'))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/css'));
});


// coffescript =============================================
gulp.task('js', function() {
    gulp.src(files.js)
        .pipe($.plumber({
            errorHandler: $.notify.onError("Error:\n<%= error %>")
        }))
        .pipe($.sourcemaps.init())
        .pipe($.if(/[.]coffee$/, $.coffee({
            bare: true
        })))
        .pipe($.concat('script.js'))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest('./public/content/js'));
});


// =========================================================
// Server
gulp.task('server', ['js', 'css'], function () {
    gulp.src('./public')
    .pipe($.webserver({
      port: 8080,
      host: 'localhost',
      fallback: 'index.html',
      livereload: true,
      open: true
    }));
});



// =========================================================
// Livereload
gulp.task('reload', function() {
    $.livereload();
});


// =========================================================
// Запуск задач
gulp.task('default', ['js', 'css']);


// Задача на отслеживание изменений ========================
gulp.task('watch', ['server'], function() {
    gulp.watch(files.css, ['css', 'reload']);
    gulp.watch(files.js, ['js', 'reload']);
    gulp.watch(tmpl(['./public/index.html']), ['reload']);
});