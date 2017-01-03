var app = angular.module('Suricat');

// CONTROLLER : Switch between login page and main page
app.controller('choiceOfPages', function($scope, $cookieStore){
	$scope.page = "login";

	$scope.modifyPage = function(newPage)
	{
		$scope.page = newPage;
	}

	$scope.loadCookieInformations = function()
	{
		$scope.firstname 					= $cookieStore.get('UserFirstname');
		$scope.lastname 					= $cookieStore.get('UserLastname');
		$scope.idUser 						= $cookieStore.get('UserIdUser');
		$scope.status 						= $cookieStore.get('UserStatus');
		$scope.access = null;
		$scope.corporateLifeRepresentative 	= $cookieStore.get('UserCorporatelifeRepresentative');
		$scope.workCouncilRepresentative 	= $cookieStore.get('UserWorkCouncilRepresentative');
		if($scope.status == "Chef de projet" || $scope.status == "Admin")
		{
			$scope.access = true;
		}
		else
		{
			$scope.access = false;
		}

		console.log($scope.corporateLifeRepresentative);
		console.log($scope.workCouncilRepresentative);
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