const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const build = require('gulp-build');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/assets/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/assets/scss/**/*.+(scss|sass)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/assets/js/**/*.js").on("change", browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

gulp.task('build', function() {

    //HTML

    gulp.src(['src/**/*.html'])
        .pipe(gulp.dest('./build'));

    //styles

    gulp.src("src/assets/scss/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("./build/assets/css"));
   
    //js
    
    gulp.src(['src/assets/js/*.js'])
        .pipe(gulp.dest('./build/assets/js'));

    //images

    gulp.src('src/assets/images/**/*')
        .pipe(gulp.dest('./build/assets/images'))

    //fonts

    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('./build/assets/fonts'))

});