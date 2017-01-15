var app = angular.module('Suricat');

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		MainPage
*	@param		{object} $scope
*	@param		{object} LinkDBBelongToByUser used to interract  with REST server
*	@param		{object} $cookies
*	@param		{object} $cookieStore
*	@description
*		MainPage Controller is used to give in 	all the site, teams & infos about user
*	
**/
app.controller('MainPage',['$scope','$cookies','$cookieStore', 'LinkDBBelongToByUser', function($scope,$cookies,$cookieStore, LinkDBBelongToByUser)
{
	$scope.choiceOfTeam = {};
	/**
	*	@memberof 	MainPage
	*	@ngdoc 		function
	*	@name 		updateList
	*	@description description :
	*
	*		-1	 get list of teams from user info liked to his id.
	*		-2	 updateList is used just after login
			  	 it allow functionnalies linked to teams across the suricat application.
	**/
	$scope.updateList = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
		});
	}

}]);
