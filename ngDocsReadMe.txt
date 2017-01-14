/**
*
*	Tutorial to implements ng docs
*	By Lionel C.
*	14/01/2017
*
*
*/

********************************************************************************
**	For french tutorial :
**************************					
**	simplx.fr/blog/2016/10/13/documenter-son-code-angular-avec-angular-jsdoc/
********************************************************************************
Before anything, ensure you have gulp installed.

follow https://github.com/allenhwkim/angular-jsdoc

install all dependancies.

Launch with gulp


Install

$ npm install jsdoc angular-jsdoc --save-dev


Quick Start

WARNING !!!!!
=============
Don't forget to change gulp file with your correct path !!!!

var shell = require('gulp-shell');
gulp.task('docs', shell.task([
  'c:/wamp64/www/Suricat_Network/node_modules/.bin/jsdoc.cmd '+
    '-c c:/wamp64/www/Suricat_Network/node_modules/angular-jsdoc/common/conf.json '+   // config file
    '-t c:/wamp64/www/Suricat_Network/node_modules/angular-jsdoc/default '+            // template file
    '-d docs '+                                                                       // output directory
    './README.md ' +                                                                  // to include README.md as index contents
    '-r c:/wamp64/www/Suricat_Network/app/scripts/controllers'                        // source code directory
]));

