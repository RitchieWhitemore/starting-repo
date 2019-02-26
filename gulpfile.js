var gulp = require("gulp");
var less = require("gulp-less");
var sourcemaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var cssmin = require('gulp-cssmin');
var rename = require("gulp-rename");
var runCmd = require('gulp-run');
var del = require('del');

var server = require("browser-sync");
var run = require("run-sequence");

gulp.task("style", function() {
    gulp.src("src/less/style.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))

        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("src/css"))
        .pipe(server.reload({stream: true}));
});

gulp.task("admin-style", function() {
    gulp.src("src/less/admin.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))

        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("assets/admin/css"))
        .pipe(server.reload({stream: true}));
});

gulp.task("gliphicons-style", function() {
    gulp.src("src/less/gliphicons.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    "last 1 version",
                    "last 2 Chrome versions",
                    "last 2 Firefox versions",
                    "last 2 Opera versions",
                    "last 2 Edge versions"
                ]
            }),
            mqpacker({
                sort: true
            })
        ]))

        .pipe(sourcemaps.write('./maps'))
        .pipe(cssmin())
        .pipe(rename('gliphicons.min.css'))
        .pipe(gulp.dest("web/css"))
    //.pipe(server.reload({stream: true}));
});

gulp.task("build", function() {
    gulp.src('web/css/*.css')
    //.pipe(gulp.dest('D:/OSPanel/domains/siju-vyaju-yii/frontend/web/css/'))
    //.pipe(cssmin())
    //.pipe(rename('style.min.css'))
        .pipe(gulp.dest('web/css/'));

});

gulp.task("polymer-build-backend", function() {
    del(['web/node_modules/**']);
    runCmd("polymer build").exec('', function() {
        gulp.src('build/prod/node_modules/**/*.*')
            .pipe(gulp.dest('web/node_modules/'))
    });
});

gulp.task("polymer-build-frontend", function() {
    del(['src/node_modules/**']);
    runCmd("polymer build").exec('', function() {
        gulp.src('build/prod/node_modules/**/*.*')
            .pipe(gulp.dest('src/node_modules/'))
    });
});

gulp.task("serve", ["style"], function() {
    server.init({
        server: "./src"
    });
    gulp.watch("src/less/**/*.less", ["style"]);
    gulp.watch("src/*.html")
        .on("change", server.reload);
});

gulp.task("run", function(fn) {
    run(
        "style",
        fn
    );
});

