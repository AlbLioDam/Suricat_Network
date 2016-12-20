var app = angular.module('Suricat');

app.controller('passwordCtrl',function($scope, LinkDBDepartment, LinkDB){

	$scope.showmsg = false;
	$scope.departments = LinkDBDepartment.query();

	$scope.empty = {};
	$scope.infosUser = 
	{
		email: $scope.email,
		password: $scope.pw1,
		idDepartment: ""
	}

	$scope.verifyPass = function(selected){
		console.log($scope.infosUser);

		var pw2 = $scope.pw2;
		if($scope.infosUser.password == pw2){
			$scope.infosUser.idDepartment = selected.idDepartment;
			console.log(selected);
			console.log($scope.infosUser);
			LinkDB.save($scope.infosUser);
			$scope.reset();
			$scope.pw2 = "";
		}
		else{
			$scope.showmsg = true;
		}
	}

	$scope.reset = function()
	{
		$scope.infosUser = angular.copy($scope.empty);
	}
});

