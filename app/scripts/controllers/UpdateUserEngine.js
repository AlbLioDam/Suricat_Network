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
	/**
	*	@memberof 	passwordCtrl
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
	*	@memberof 	passwordCtrl
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
	*	@memberof 	passwordCtrl
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
	*	@memberof 	passwordCtrl
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
		else{
			$scope.showmsg = true;
		}
	}
	/**
	*	@memberof 	passwordCtrl
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
	/**
	*	@memberof 	passwordCtrl
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
	*	@memberof 	passwordCtrl
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
	      $scope.saveModifications();
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

		if(response.car == 1) 									document.getElementById("car").checked = true;
		if(response.carsharing == 1) 							document.getElementById("carsharing").checked = true;
		if(response.active == 1) 								document.getElementById("active").checked = true;
		if(response.corporateLifeRepresentative == 1) 			document.getElementById("CE").checked = true;
		if(response.workCouncilRepresentative == 1)				document.getElementById("VE").checked = true;

		$scope.infosUser = response;
		$scope.infosUser.idDepartment = $scope.departments[indexDepartment];
		$scope.infosUser.status = $scope.listOfStatus[indexStatus];
		//$scope.infosUser.status = $scope.infosUser.status.st;
		//$scope.infosUser.idDepartment = $scope.infosUser.idDepartment.idDepartment;
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


