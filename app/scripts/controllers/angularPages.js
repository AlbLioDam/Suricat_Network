var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 

app.controller('Pages', function($scope){
	$scope.paths = [{page: 'Main', path: 'views/MainPageSuricat.html'},
					{page: 'VE', path: 'views/index.html'},
					{page: 'CE', path: 'views/indexLogin.html'},
					{page: 'Loisir', path: 'views/indexLogin.html'},
					{page: 'Configuration', path: 'createUser.html'}];
});


