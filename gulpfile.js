var gulp = require( 'gulp' ),
    pug = require( 'gulp-pug' ),
    styl = require( 'gulp-stylus' ),
    sourcemaps = require( 'gulp-sourcemaps' ),
    plumber = require( 'gulp-plumber' ),
    vender = require( 'gulp-autoprefixer' ),
    uglify = require( 'gulp-uglify' ),
    path = {

        src : {
            pug : 'src/*.pug',
            styl : 'src/*.styl',
            script : 'src/*.js'
        },

        build : {
            pug : 'build/',
            styl : 'build/',
            script : 'build/'
        },

        watch : {
            pug : 'src/*.pug',
            styl : 'src/*.styl',
            script : 'src/*.js'
        }

    }

// pug    
gulp.task( 'pug:build', function () {
    return gulp.src( path.src.pug )
               .pipe( pug() )
               .pipe( gulp.dest( path.build.pug ) );               
});    

// styl
gulp.task( 'styl:build', function () {
    return gulp.src( path.src.styl )
               .pipe( styl( { compress : true, 'include css' : true } ) )
               .pipe( gulp.dest( path.build.styl ) );
});

// script
gulp.task( 'script', function () {
    return gulp.src( path.src.script )
            //    .pipe( uglify() )
               .pipe( gulp.dest( path.build.script ) )
});

// watch
gulp.task( 'watch', function () {
    gulp.watch( path.watch.pug, gulp.series( 'pug:build' ) )
    gulp.watch( path.watch.styl, gulp.series( 'styl:build' ) )
    gulp.watch( path.watch.script, gulp.series( 'script' ) )
});

// default
gulp.task( 'default', gulp.series( 'pug:build', 'styl:build', 'script', 'watch' ) )