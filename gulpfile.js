var gulp = require('gulp');
var concat = require('gulp-concat');
var terser = require('gulp-terser');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var nodemon = require('gulp-nodemon');

fs.readdirSync(__dirname + '/gulp').forEach((task) => {
    require('./gulp/' + task);
})

gulp.task('js', () => {
    gulp.src(['ng/module.js', 'ng/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets'));
    return new Promise((res, rej) => {
        console.log('concat done!');
        res();
    });
});
gulp.task('watch:js', () => {
    gulp.watch('ng/**/*.js', {delay: 500}, gulp.series('js'));
});

gulp.task('dev:server', () => {
    nodemon({
        script: 'server.js',
        ext: 'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    });
});

gulp.task('dev', gulp.parallel('watch:css', 'watch:js', 'dev:server'));
