var app = angular.module('Suricat');

app.controller('MainPage',['$scope','$cookies','$cookieStore', function($scope,$cookies,$cookieStore)
{
	$scope.page = "'team.html'";

	// DISPLAY the firstname and lastname of User
	//$scope.firstname 	= $cookieStore.get('UserFirstname');
	//$scope.lastname 	= $cookieStore.get('UserLastname');

}]);
