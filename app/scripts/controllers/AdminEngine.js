var app = angular.module('Suricat');

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		adminCtrler
*	@param		{object} $scope used to interract with scope
*	@param		{object} LinkDB used to interract  with REST server
*	@param		{object} LinkDBDepartment used to interract  with REST server
*	@description
*		Controller used to add hide and save users infos
*	
**/
app.controller('adminCtrler',function($scope, LinkDB, LinkDBDepartment){

	$scope.departments = LinkDBDepartment.query();
	$scope.users = LinkDB.query();

	$scope.addMember = function()
	{

	}

	$scope.hideMembers = function()
	{

	}

	$scope.saveModifications = function()
	{

	}
})