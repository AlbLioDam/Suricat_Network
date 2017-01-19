var app = angular.module('Suricat');
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		passwordCtrl
*	@param		{object} $scope
*	@param		{object} LinkDBDepartment
*	@param		{object} LinkDB
*	@param		{object} $cookieStore
*	@param		{object} $mdDialog
*	@description
*		Controller used for user form management
*
*			this controller allow functions :
*			 
*			1- add user
*			2- modify user
*			3- empty create user form
*			4- verify user password
*			5- show information
*			6- reset
*			7- show confirmation box
*	
**/
app.controller('userAdminModifications',function($scope, LinkDBDepartment, LinkDB, $cookieStore, $mdDialog){

	$scope.showmsg = false;
	$scope.departments = LinkDBDepartment.query();
	$scope.users = LinkDB.query();

	$scope.empty = {};

	$scope.listOfStatus = [{st:"Utilisateur"}, {st:"Chef de projet"}, {st:"Admin"}];


	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@description
	*		add a user
	*
	**/
	$scope.addAMember = function()
	{
		$scope.modifyUserClicked = !$scope.modifyUserClicked;
		$scope.infosUser.email   ="";
		$scope.infosUser.password="";
		$scope.infosUser.pw2 	 ="";
	}
	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@description
	*		modify user information
	*
	**/
	$scope.modifyUser = function()
	{
		$scope.modifyUserClicked = !$scope.modifyUserClicked;
		$scope.infosUser =
		{
			email: "",
			password: "",
			pw2: "",
			department: "",
			status: "",
			corporateLifeRepresentative: "",
			workCouncilRepresentative: "",
			active: "",
			lastname: "",
			firstname: "",
			address: "",
			city: "",
			car: "",
			carsharing: "",
			idDepartment:""
		}


	}
	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@description
	*		empty user form
	*
	**/
	$scope.emptyCreateUserForm = function()
	{
			$scope.reset();
			$scope.pw2 = "";
	}
	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@param		{object} selected
	*	@description
	*		verify user password
	*
	**/
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
		else
		{
			$scope.showmsg = true;
		}
	}
	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@param		{object} user
	*	@description
	*		show user information
	*
	**/
	$scope.showInformations = function(user)
	{
		$scope.infosUser =
		{
			email: "",
			password: "",
			pw2: "",
			status: "",
			corporateLifeRepresentative: "",
			workCouncilRepresentative: "",
			active: "",
			lastname: "",
			firstname: "",
			address: "",
			city: "",
			car: "",
			department: "",
			carsharing: "",
			idDepartment: "", 
			idUser: ""
		}

		LinkDB.getUserById({idUser: user.idUser}).$promise.then(function(response){
			var indexDepartment = 0;
			for (var i = 0; i < $scope.departments.length; i++)
			{
				if($scope.departments[i].idDepartment == response.idDepartment)
				{
					indexDepartment = i;
					console.log(indexDepartment);
				}
			}

			console.log("$scope.departments[indexDepartment] : ", $scope.departments[indexDepartment]);
			console.log("$scope.infosUser.idDepartment : ", $scope.infosUser.idDepartment);

			var indexStatus = 0;
			for (var i = 0; i < $scope.listOfStatus.length; i++)
			{
				if($scope.listOfStatus[i].st == response.status)
				{
					indexStatus = i;
					console.log(indexStatus);
				}
			}

			document.getElementById("car").checked 			= response.car;
			document.getElementById("carsharing").checked   = response.carsharing;
			document.getElementById("active").checked 		= response.active;
			document.getElementById("CE").checked 			= response.corporateLifeRepresentative;
			document.getElementById("VE").checked 			= response.workCouncilRepresentative;

			console.log("response", response);
			$scope.infosUser = response;
			$scope.infosUser.idDepartment = $scope.departments[indexDepartment];
			$scope.infosUser.status = $scope.listOfStatus[indexStatus];
			console.log("$scope.infosUser ici : ", $scope.infosUser);
		});
	}
	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@param		{object} selected
	*	@description
	*		reset info user
	*
	**/
	$scope.reset = function()
	{
		$scope.infosUser = angular.copy($scope.empty);
	}

	/**
	*	@memberof 	userSelfModifications
	*	@ngdoc 		function
	*	@description
	*		record user modifications ( adress, city, carsharing...)
	*
	**/
	$scope.recordModifications = function()
	{
		$scope.infosUser.car 		= document.getElementById("car").checked;
		$scope.infosUser.carsharing     = document.getElementById("carsharing").checked;
		$scope.infosUser.active 	= document.getElementById("active").checked;
		$scope.infosUser.VE 		= document.getElementById("VE").checked;
		$scope.infosUser.CE 		= document.getElementById("CE").checked;

		console.log($scope.infosUser);
		LinkDB.updateUser($scope.infosUser).$promise.then(function(response){
			console.log(response);
		});
	};

	/**
	*	@memberof 	userAdminModifications
	*	@ngdoc 		function
	*	@param		{object} ev
	*	@description
	*		show confirmation box
	*
	**/	
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
	      $scope.recordModifications();
	    }, function() 
	    {
	      //nothing
	    });
  	};

});
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		userSelfModifications
*	@param		{object} $scope
*	@param		{object} LinkDBDepartment
*	@param		{object} LinkDB
*	@param		{object} $cookieStore
*	@param		{object} $mdDialog
*	@description
*		Controller used for user form self management
*
*			this controller allow functions :
*			 
*			1- record user Modifications
*			2- show confirmation box
*	
**/
app.controller('userSelfModifications',function($scope, LinkDBDepartment, LinkDB, $cookieStore, $mdDialog){

	$scope.departments = LinkDBDepartment.query();

	$scope.infosUser =
	{
		email: "",
		password: "",
		pw2: "",
		department: "",
		status: "",
		corporateLifeRepresentative: "",
		workCouncilRepresentative: "",
		active: "",
		lastname: "",
		firstname: "",
		address: "",
		city: "",
		car: "",
		carsharing: "",
		idDepartment: "", 
		idUser: $cookieStore.get('UserIdUser')
	}

	$scope.listOfStatus = [{st:"Utilisateur"}, {st:"Chef de projet"}, {st:"Admin"}];

	$scope.myself = $cookieStore.get('UserIdUser');

	LinkDB.getUserById({idUser: $scope.myself}).$promise.then(function(response){
		var indexDepartment = 0;
		for (var i = 0; i < $scope.departments.length; i++)
		{
			if($scope.departments[i].idDepartment == response.idDepartment)
			{
				indexDepartment = i;
			}
		}

		var indexStatus = 0;
		for (var i = 0; i < $scope.listOfStatus.length; i++)
		{
			if($scope.listOfStatus[i].st == response.status)
			{
				indexStatus = i;
			}
		}

		document.getElementById("car").checked 			= response.car;
		document.getElementById("carsharing").checked 	= response.carsharing;
		document.getElementById("active").checked 		= response.active;
		document.getElementById("CE").checked 			= response.corporateLifeRepresentative;
		document.getElementById("VE").checked 			= response.workCouncilRepresentative;

		$scope.infosUser = response;
		$scope.infosUser.idDepartment = $scope.departments[indexDepartment];
		$scope.infosUser.status = $scope.listOfStatus[indexStatus];
	});

	console.log($scope.infosUser);
	/**
	*	@memberof 	userSelfModifications
	*	@ngdoc 		function
	*	@description
	*		record user modifications ( adress, city, carsharing...)
	*
	**/
	$scope.recordModifications = function()
	{
		$scope.infosUser.car 		= document.getElementById("car").checked;
		$scope.infosUser.carsharing = document.getElementById("carsharing").checked;
		$scope.infosUser.active 	= document.getElementById("active").checked;
		$scope.infosUser.VE 		= document.getElementById("VE").checked;
		$scope.infosUser.CE 		= document.getElementById("CE").checked;

		console.log($scope.infosUser);
		LinkDB.updateUser($scope.infosUser).$promise.then(function(response){
			console.log(response);
		});
	}
	/**
	*	@memberof 	userSelfModifications
	*	@ngdoc 		function
	*	@param		{object} ev
	*	@description
	*		show confirmation box
	*
	**/
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
	      $scope.recordModifications();
	    }, function() 
	    {
	      //nothing
	    });
  	};
});


