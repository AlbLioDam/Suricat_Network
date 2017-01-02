var app = angular.module('Suricat');

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