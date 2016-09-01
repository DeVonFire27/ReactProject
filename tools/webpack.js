/**
 * Created by Alex Redmon on 8/22/2016.
 */
const webpack = require("webpack");
var path = require('path');
var gutil= require('gulp-util');
var root = '../Config/';
const WEBPACK_CONFIG = path.resolve('config/webpack.config.js');
const compiler = webpack(require(WEBPACK_CONFIG));
var printReport = function(stats)
{
    gutil.log('[webpack]', stats.toString({
        modules:false,
        errorDetails:true,
        timings:false,
        cached:false,
        colors:true
    }));
}
// compiler.run(function(err,stats){
//     if(err)
//     {
//         console.log(err);
//     }
//     printReport(stats);
// })
compiler.watch({
    aggregateTimeout: 300
}, function(err, stats) {
    if(err) {
        gutil.log('error', new gutil.PluginError('[webpack]', err));
    }

    printReport(stats);
});
