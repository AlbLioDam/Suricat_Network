/******************************
**							 **
**  	Tests with karma     **
**	Lionel / Alban / Damien	 **
**							 **
******************************/

before any test, you need to install Karma, chai, Bower, angular mocs

follow this instructions to install packages

/************
**  karma  **
************/

 npm install -g generator-karma

 or with bower ( ensure you have bower installed or npm install bower --save -g)

 bower install karma

 npm install -g karma-cli

/************
**  Mocha  **
************/

bower install -g mocha

or npm install -g mocha

/****************************************
**  Chai, sinon, karma mocha reporter  **
****************************************/

npm i -D chai sinon  karma-chai-sinon karma-mocha karma-mocha-reporter

(chai is an assertion library)

/*******************
**  Angular Mocs  **
*******************/

npm install angular-mocs -g

=> after that launch : Karma init ( you will setup karma)

	specify here where your scrpits (.js) files are located :

	exemple : 
	 files: [
	      'node_modules/angular/angular.js',
	      'node_modules/angular-mocks/angular-mocks.js',
	      'js/*.js',
	      'test/**/*.js'
	    ],

=> karma start ( to launch test)


/*************************
**  @author : Lionel C. **
*************************/
