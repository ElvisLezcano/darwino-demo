var gulp = require('gulp');

var PATHS = {
    src: {
        js: 'src/**/*.ts',
        html: [
            'src/**/*.html',
            'src/**/*.css',
            'src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif',
            'src/**/*.json'
        ]
    },
    lib: [
        'node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',
        'node_modules/angular2/bundles/angular2.min.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/http.min.js',
        'node_modules/angular2/bundles/http.dev.js',
        'node_modules/systemjs/dist/system-csp-production.js'
    ],
    typings: [
        'node_modules/angular2/bundles/typings/angular2/angular2.d.ts',
        'node_modules/angular2/bundles/typings/angular2/http.d.ts'
    ]
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('js', function () {
    var typescript = require('gulp-typescript');
    var tsResult = gulp.src([PATHS.src.js].concat(PATHS.typings))
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: '1.6',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('html', function () {
    return gulp.src(PATHS.src.html).pipe(gulp.dest('dist'));
});

gulp.task('libs', function () {
    return gulp.src(PATHS.lib).pipe(gulp.dest('dist/lib'));
});

gulp.task('build', ['libs', 'html', 'js'], function () {
});

gulp.task('watch', ['build'], function () {
    gulp.watch(PATHS.src.html, ['html']);
    gulp.watch(PATHS.src.js, ['js']);
});

gulp.task('play', ['watch'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    app = connect().use(serveStatic(__dirname + '/dist'));  // serve everything that is static
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

