var app = angular.module('Suricat');

app.controller('MainPage',['$scope','$cookies','$cookieStore', function($scope,$cookies,$cookieStore)
{
	$scope.page = "'team.html'";

	// DISPLAY the firstname and lastname of User
	$scope.firstname =$cookieStore.get('UserFirstname');
	$scope.lastname =$cookieStore.get('UserLastname');

	// METHOD - VERIFY : Send the login and password to be verified in the database through the rest server
	$scope.changePage = function(request)
	{
		if(request == "teamManagement")
		{
			$scope.page = "'teamManagement.html'";
		}
	}
}]);
