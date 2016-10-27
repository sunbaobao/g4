// 引入 gulp 摸快
var gulp = require("gulp");
// 引入 sass 摸快
var sass = require("gulp-ruby-sass");
//引入 less
var less = require("gulp-less");
//css 压缩
var minCss = require("gulp-minify-css");
//文件合并
var concat = require("gulp-concat");
//js 文件压缩
var minJs = require("gulp-uglify");
//重命名
var rename = require("gulp-rename");
//css 后编译
var postcss = require('gulp-postcss');
//css 属性前缀
var autoprefixer = require('autoprefixer');
//后编译模块压缩 处理 css
var cssnano = require('cssnano');


var path = {
	"src" : {
		"css" : [
			"./src/css/**.scss"
		],
		"js" : [
			"./src/**/**.js"
		],
		"html" : [
			"./src/**/**.html"
		],
		"other" : [
			"./src/**/**.jpg",
			"./src/**/**.png",
			"./src/**/**.jpeg",
			"./src/**/**.gif",
			"./src/**/**.eot",
			"./src/**/**.svg",
			"./src/**/**.ttf",
			"./src/**/**.woff"
		]
	},
	"dest" : "./dest/"
};
// less 任务
gulp.task("less",function(){
	gulp.src("./src/css/demo2.less")
		.pipe(less())  //less 编译
		.pipe(postcss([
        	autoprefixer //浏览器前缀
        ]))
		.pipe(gulp.dest(path.dest + "css/"))
});

//css 事件任务
gulp.task("css",function(){
	sass(path.src.css)
		//监听 scss 语法错误
        .on('error', sass.logError)
        //文件合并，并传入新文件的名字
//      .pipe(concat("min.css"))
		//后编译处理
        .pipe(postcss([
        	autoprefixer //浏览器前缀
//      	, 
//      	cssnano       //压缩css
        ]))
        //压缩 css
//      .pipe(minCss())
        //输出到指定目录
        .pipe(gulp.dest(path.dest + "css/"))
});


gulp.task("js",function(){
	//把需要合并压缩的 js 文件列出来
	gulp.src(path.src.js)
		.pipe(gulp.dest(path.dest)); //输出
});

gulp.task("html",function(){
	//把需要合并压缩的 js 文件列出来
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.dest)); //输出
});

gulp.task("other",function(){
	//把需要合并压缩的 js 文件列出来
	gulp.src(path.src.other)
		.pipe(gulp.dest(path.dest)); //输出
});
//sass 任务
gulp.task('sass', function () {
	sass('src/css/*.scss')
		.on('error', sass.logError)
		.pipe(postcss([
			autoprefixer
		]))
		.pipe(minCss())
		.pipe(gulp.dest('./dest/css/'))
});
//打包静态文件
gulp.task("build",["css","js","html","other"]);

//添加一个默认任务
//执行默认任务时 先 执行 css 任务
gulp.task("default",["build"],function(){
	//监听文件修改
	//当监听到文件修改会触发相应的任务事件
	gulp.watch(path.src.css,["css"]);
	
	gulp.watch(path.src.js,["js"]);
	
	gulp.watch(path.src.html,["html"]);
	
	gulp.watch(path.src.other,["other"]);
});
