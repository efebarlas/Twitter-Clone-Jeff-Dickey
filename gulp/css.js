var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', () => {
    gulp.src('css/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets'))
    return new Promise((res, rej) => {
        console.log('concat done!');
        res();
    });
});

gulp.task('watch:css', () => {
    gulp.watch('css/**/*.styl', {delay: 500}, gulp.series('css'));
});