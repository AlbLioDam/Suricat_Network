var app = angular.module('Suricat');

app.controller('MainPage', function($scope)
{
	$scope.page = "'team.html'";
	// METHOD - VERIFY : Send the login and password to be verified in the database through the rest server
	$scope.changePage = function(request)
	{
		if(request == "teamManagement")
		{
			$scope.page = "'teamManagement.html'";
		}
	}
});