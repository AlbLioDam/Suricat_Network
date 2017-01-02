var app = angular.module('Suricat');

// CONTROLLER : Switch between login page and main page
app.controller('choiceOfPages', function($scope){
	$scope.page = "login";

/*	$scope.firstname 	= $cookieStore.get('UserFirstname');
	$scope.lastname 	= $cookieStore.get('UserLastname');
	$scope.idUser 	= $cookieStore.get('UserIdUser');
	$scope.status 	= $cookieStore.get('UserStatus');*/

	$scope.modifyPage = function(newPage)
	{
		$scope.page = newPage;
	}
});

// CONTROLLER : Switch inside main page between all differents options
app.controller('choiceOfInside', function($scope){
	$scope.inside = "team";

	$scope.modifyPageInside = function(newInside)
	{
		$scope.inside = newInside;
	}
});

// CONTROLLER : Switch inside main page between all differents options
app.controller('choiceOfInsideAdminUsers', function($scope){
	$scope.insideAdminUser = "updateUser";

	$scope.modifyPageInsideAdminUsers = function(newInsideAdminUser)
	{
		$scope.insideAdminUser = newInsideAdminUser;
	}
});