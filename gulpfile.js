const gulp = require('gulp'),
  less = require('gulp-less'),
  minifyCss = require('gulp-minify-css'),
  minifyJs = require('gulp-minify'),
  uglify = require('gulp-uglify'),
  connect = require('gulp-connect'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  fileinclude = require('gulp-file-include'),
  path = require('path');

/*less编译*/
gulp.task('less', function () {
  return gulp.src(['./src/less/bootstrap.less', './src/project.less'])
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'));
});
// # 定义一个监控css文件变化的任务
gulp.task('lessCss', function () {
  gulp.watch('./src/**', ['less']);
});

/*css压缩*/
gulp.task('minifyCss', function () {
  return gulp.src(['./dist/css/*[!.min].css'])
    .pipe(rename({suffix: ".min"}))
    .pipe(minifyCss({keepSpecialComments: 1, keepBreaks: false, removeEmpty: true, debug: true}))
    .pipe(gulp.dest('./dist/css/'));
});
// # 定义一个监控css文件变化的任务
gulp.task('miniCss', function () {
  gulp.watch('./dist/css/*[!.min].css', ['minifyCss']);
});


/*gulp.task('rename', function(){
  gulp.src(['./src/less/animate/!**!/!*.css'])
    .pipe(rename({extname: ".less"}))
    .pipe(gulp.dest('./test/'))
});*/


/*gulp.task('miniScript', function() {
  gulp.src(['./src/js/!*.js'])
    .pipe(uglify())
    .pipe(concat('evPublicInit.js'))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js'))
});*/
const scriptSrc = require('./src/js/scriptSrc'),
  scriptArray = scriptSrc.src();
gulp.task('miniScript', function() {
  gulp.src(scriptArray)
    .pipe(concat('evPublicInit.js'))
    .pipe(minifyJs())
    // .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('dist/js'))
});

// # 定义一个监控js文件变化的任务
gulp.task('miniJs', function () {
  gulp.watch('./src/js/*.js', ['miniScript']);
});

//html文件合并
gulp.task('fileinclude', function () {
  gulp.src(['./views/**/*.html', '!./views/include', '!./views/include/**'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('docs'));
});

// # 定义一个监控html文件变化的任务
gulp.task('htmlConcat', function () {
  gulp.watch(['./views/**/*.html'], ['fileinclude']);
});

gulp.task('load', function () {
  gulp.src(['./docs/*.html']).pipe(connect.reload());
  // gulp.pipe(connect.reload());
});


//定义livereload任务
gulp.task('connect', function () {
  connect.server({
    'livereload': true
  });
});

gulp.task('popup', function(){
  //js
  gulp.src(['./src/js/popup.js'])
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('./dist/alone_module/popup'));
  // less - css
  gulp.src(['./src/less/alone_module/popup.less'])
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('./dist/alone_module/popup'));
  // css - min
  gulp.src(['./dist/alone_module/popup/popup.css'])
    .pipe(rename({suffix: ".min"}))
    .pipe(minifyCss({keepSpecialComments: 1, keepBreaks: false, removeEmpty: true, debug: true}))
    .pipe(gulp.dest('./dist/alone_module/popup'))
});
gulp.task('datePicker', function(){
  //js
  gulp.src(['./src/js/moment.js', './src/js/datepicker.all.js'])
    .pipe(concat('datepicker.js'))
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest('./dist/alone_module/datepicker'));
  // less - css
  gulp.src(['./src/less/alone_module/datepicker.less'])
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('./dist/alone_module/datepicker/'));
  // css - min
  gulp.src(['./dist/alone_module/datepicker/datepicker.css'])
    .pipe(rename({suffix: ".min"}))
    .pipe(minifyCss({keepSpecialComments: 1, keepBreaks: false, removeEmpty: true, debug: true}))
    .pipe(gulp.dest('./dist/alone_module/datepicker'))
});


gulp.task('watch', function () {
  gulp.watch(['./docs/**', './dist/css/*.min.css'], ['load']);
});
gulp.task('default', ['watch', 'lessCss', 'miniCss', 'miniJs', 'htmlConcat', 'connect']);

