var app = angular.module('Suricat');

app.controller('passwordCtrl',function($scope, LinkDBDepartment, LinkDB, $cookieStore){

	$scope.showmsg = false;
	$scope.departments = LinkDBDepartment.query();
	$scope.users = LinkDB.query();
	//$scope.userToModify = LinkDB.get({idUser: $cookieStore.get})

	$scope.empty = {};
/*	$scope.infosUser = 
	{
		email: $scope.email,
		password: $scope.pw1,
		idDepartment: ""
	}*/

	/*$scope.user = LinkDB.getUserById({idUser: 1});
	console.log($scope.user);
	showInformations($scope.user);*/

	$scope.verifyPass = function(selected)
	{
		var pw2 = $scope.pw2;
		if($scope.infosUser.password == pw2)
		{
			$scope.infosUser.idDepartment = selected.idDepartment;
			LinkDB.save($scope.infosUser);
			$scope.reset();
			$scope.pw2 = "";
		}
		else{
			$scope.showmsg = true;
		}
	}

	$scope.showInformations = function(user)
	{
		$scope.infosUser = 
		{
			email: user.email,
			password: user.password,
			/*status: user.status,*/
			firstname: user.firstname,
			lastname: user.lastname,
			address: user.address,
			city: user.city,
			/*car: user.car,
			covoit: user.carsharing,
			active: user.active*/
		}
		console.log($scope.infosUser);
	}

	$scope.reset = function()
	{
		$scope.infosUser = angular.copy($scope.empty);
	}
});

