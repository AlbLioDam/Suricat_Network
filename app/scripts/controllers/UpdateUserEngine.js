var app = angular.module('Suricat');

app.controller('passwordCtrl',function($scope, LinkDBDepartment, LinkDB, $cookieStore, $mdDialog){

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
	$scope.addAMember = function()
	{
		$scope.modifyUserClicked = !$scope.modifyUserClicked;
	}

	$scope.modifyUser = function()
	{
		$scope.modifyUserClicked = !$scope.modifyUserClicked;

	}
	$scope.emptyCreateUserForm = function()
	{
			$scope.reset();
			$scope.pw2 = "";
	}

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

	$scope.showConfirmation = function(ev) 
	{
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('Attention !')
	          .textContent('Confirmez-vous les modifications effectuées ?')
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('Oui')
	          .cancel('Non');

	    $mdDialog.show(confirm).then(function() 
	    {
	      $scope.saveModifications();
	    }, function() 
	    {
	      //nothing
	    });
  	};

});


