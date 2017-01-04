var app = angular.module('Suricat');

app.controller('MainPage',['$scope','$cookies','$cookieStore', 'LinkDBBelongToByUser', function($scope,$cookies,$cookieStore, LinkDBBelongToByUser)
{
	$scope.choiceOfTeam = {};

	$scope.updateList = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
			//console.log(response);
		});
	}
	//$scope.page = "'team.html'";
}]);
