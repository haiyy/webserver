const fs=require("fs");
const url=require("url");
const path=require("path");
const gulp=require("gulp");
const rename=require("gulp-rename");
const uglify=require("gulp-uglify");
const concat=require("gulp-concat");
const cleancss=require("gulp-clean-css");
const webserver=require("gulp-webserver");
gulp.task("clean",function(){
     gulp.src("./Content/css/*.css")
         .pipe(concat("style.css"))
         .pipe(cleancss())
         .pipe(gulp.dest("Bind/css"))
    });
gulp.task("ugli",function(){
     gulp.src("./Content/script/*.js")
         .pipe(concat("script.js"))
         .pipe(uglify())
         .pipe(gulp.dest("Bind/js"))
    })
gulp.task("web",function(){
     gulp.src("*")
         .pipe(webserver({
             host:"localhost",
             port:8080,
             fillback:"index.html",
             middleware:function(req,res,next){
                if(req.url=="/favicon.ico"){
                    return;
                }
                res.writeHead(200,{"content-type":"index.html;charset=utf-8"})
                var pathname=path.join(__dirname,"index.html");
                res.end("2018-1-2")
             }
            }))
    })
gulp.task("default",["clean","ugli","web"])