var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background pictur
app.controller('PageOptions', function($scope){
	// Generate random number 1 to 9
	var randomPicture = Math.floor((Math.random()*8)+1);

	// Put the number of the picture into the path. 
	$scope.path = "images/" + randomPicture + ".jpg";
});