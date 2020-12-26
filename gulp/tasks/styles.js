module.exports = function () {
    $.gulp.task('styles:build', () => {
        return $.gulp.src('./dev/scss/main.scss')
            .pipe($.gp.sass({
                'include css': true
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe($.gp.csscomb())
            .pipe($.gp.csso())
            .pipe($.gulp.dest('./build/css/'))
    });

    $.gulp.task('styles:dev', () => {
        return $.gulp.src('./dev/scss/main.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sass({
                'include css': true
            }))
            .on('error', $.gp.notify.onError(function (error) {
                return {
                    title: 'Scss',
                    message: error.message
                };
            }))
            .pipe($.gp.autoprefixer({
                browsers: ['last 3 version']
            }))
			.pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest('./build/css/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
