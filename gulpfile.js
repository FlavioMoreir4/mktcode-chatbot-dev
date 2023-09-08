const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const dest = require('gulp-dest');

// Compile and autoprefix Sass files
gulp.task('sass', function () {
    return gulp.src(['scss/*.scss', '!scss/*.min.scss']) // Exclude already minified files
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'));
});

// Minify CSS files and generate sourcemaps
gulp.task('sass:minify', function () {
    return gulp.src(['css/*.css', '!css/*.min.css']) // Exclude already minified files
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

gulp.task('sass-admin', function () {
    return gulp.src(['admin/scss/*.scss', '!admin/scss/*.min.scss']) // Exclude already minified files
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('admin/css'));
});

gulp.task('sass-admin:minify', function () {
    return gulp.src(['admin/css/*.css', '!admin/css/*.min.css']) // Exclude already minified files
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('admin/css'));
});

// Minify JS files and generate sourcemaps
gulp.task('js', function () {
    return gulp.src(['js/*.js', '!js/*.min.js']) // Exclude already minified files
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('js'));
});

gulp.task('js-admin', function () {
    return gulp.src(['admin/js/*.js', '!admin/js/*.min.js']) // Exclude already minified files
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('admin/js'));
});

// Watch tasks
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', gulp.series('sass', 'sass:minify'));
    gulp.watch('admin/scss/*.scss', gulp.series('sass-admin', 'sass-admin:minify'));
    gulp.watch('js/*.js', gulp.series('js'));
    gulp.watch('admin/js/*.js', gulp.series('js-admin'));
});

// Default task
gulp.task('default', gulp.series(
    gulp.parallel('watch')
));


// Copy production files to 'dist' folder while maintaining folder structure
gulp.task('copy:admin', function () {
    return gulp.src([
        'admin/css/admin.min.css',
        'admin/js/admin.min.js',
        'admin/partials/admin-display.php',
        'admin/codemirror/lib/codemirror.js',
        'admin/codemirror/lib/codemirror.css',
        'admin/codemirror/addon/hint/show-hint.js',
        'admin/codemirror/addon/hint/show-hint.css',
        'admin/codemirror/theme/material-darker.css',
        'admin/codemirror/mode/javascript/javascript.js',
        'admin/codemirror/addon/fold/foldcode.js',
        'admin/codemirror/addon/fold/foldgutter.js',
        'admin/codemirror/addon/fold/foldgutter.css',
        'admin/codemirror/addon/fold/brace-fold.js',
        'admin/codemirror/addon/fold/comment-fold.js',
        'admin/codemirror/addon/fold/indent-fold.js',
        'admin/codemirror/addon/hint/javascript-hint.js',
    ], { base: '.' })
        .pipe(gulp.dest('dist/mktcode-chatbot'));
});

gulp.task('copy:main', function () {
    return gulp.src([
        'assets/images/avatar-img.jpeg',
        'assets/images/close.png',
        'css/main.min.css',
        'includes/class-chatbot-admin.php',
        'includes/class-chatbot.php',
        'js/chatbot.min.js',
        'js/util_class.min.js',
        'partials/chatbot.php',
        'chatbot.php'
    ], { base: '.' })
    .pipe(gulp.dest('dist/mktcode-chatbot'));
});

// Create a 'build' task to generate production folder
gulp.task('build', gulp.series(
    gulp.parallel(
        gulp.series('sass', 'sass:minify'),
        gulp.series('sass-admin', 'sass-admin:minify'),
        'js',
        'js-admin'
    ),
    gulp.parallel('copy:admin', 'copy:main')
));