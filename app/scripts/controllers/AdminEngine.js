var app = angular.module('Suricat');

app.controller('adminCtrler',function($scope, LinkDB, LinkDBDepartment, LinkDB){

	$scope.departments = LinkDBDepartment.query();
	$scope.users = LinkDB.query();

	$scope.showToModify = function(user)
	{
		$scope.infosUser = 
		{
			email: user.email,
			password: user.password,
			status: user.status,
			firstname: user.firstname,
			lastname: user.lastname,
			address: user.address,
			city: user.city,
			car: user.car,
			covoit: user.carsharing,
			active: user.active
		}
	}

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