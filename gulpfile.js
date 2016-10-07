const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');
const $ = gulpLoadPlugins();
const pkg = require('./package.json');
const sass = require('gulp-sass');

// Banner
const banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * (c) ' + new Date().getFullYear() + ' <%= pkg.author %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ' '
].join('\n');

// Default paths
const paths = {
    output: 'dist/',
    sass: 'src/dialog-size.scss',
    test: {
        src: 'src/test.scss',
        sass: 'test/',
    }
};

// Clean output dir
gulp.task('clean', () => {
    return del(`${paths.output}**/*`);
});

gulp.task('styles', () => {
    return gulp.src(paths.sass)
        .pipe($.plumber())
        .pipe($.header(banner, {
            pkg
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('styles:sass', () => {
    return gulp.src(paths.sass)
        .pipe($.header(banner, {
            pkg
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('test:sass', () => {
    return gulp.src(paths.test.src)
        .pipe(sass())
        .pipe(gulp.dest(paths.test.sass));
});

gulp.task('build', ['styles', 'styles:sass'])

gulp.task('default', ['build']);
