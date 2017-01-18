var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		TeamManagementPage
*	@param		{object} $scope
*	@param		{object} LinkDBTeams
*	@param		{object} LinkDB
*	@param		{object} LinkDBDepartment
*	@param		{object} LinkDBBelongTo
*	@param		{object} LinkDBBelongToByUser
*	@param		{object} LinkDBNotBelongToByTeam
*	@param		{object} NotBelongToByTeam
*	@param		{object} LinkDBBelongToRemove
*	@description
*		Controller used Team management
*
*			this controller allow functions :
*			 
*			1- Show team details
*			2- check changes
*			3- reset modifications
*			4- save team info
*			5- add user in team
*			6- remove user
*			7- show users not in the team
*			8- stop add user
*			9- reset list of team
*	
**/
app.controller('TeamManagementPage', function($scope, LinkDBTeams, LinkDB, LinkDBDepartment, LinkDBBelongTo, LinkDBBelongToByUser, LinkDBNotBelongToByTeam, NotBelongToByTeam, LinkDBBelongToRemove)
{
	LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
		$scope.teams = angular.copy(response);
	});
	$scope.departments 	= LinkDBDepartment.query();
	$scope.usersbyteams = LinkDBBelongTo.query();

	$scope.addMember = false;
	$scope.blockedTeamChoice = false;
	$scope.blockedTeamDetail = true;

	$scope.empty = {
		idTeam: "",
		teamName: "",
		projectName: "",
		projectDescription: ""
	}

	$scope.team = {
		idTeam: "",
		teamName: "",
		projectName: "",
		projectDescription: ""
	}

	$scope.teamVerif = {
		idTeam: "",
		teamName: "",
		projectName: "",
		projectDescription: ""
	}

	$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@param		{object} selected
	*	@description
	*		show team details
	*
	**/
	$scope.showTeamDetail = function(selected)
	{
		if(selected != null)
		{
			$scope.addMember = false;
			$scope.teamSelected = selected;

			$scope.team = {
				idTeam: $scope.teamSelected.idTeam,
				teamName: $scope.teamSelected.teamName,
				projectName: $scope.teamSelected.projectName,
				projectDescription: $scope.teamSelected.projectDescription
			}

			$scope.teamVerif = {
				idTeam: $scope.teamSelected.idTeam,
				teamName: $scope.teamSelected.teamName,
				projectName: $scope.teamSelected.projectName,
				projectDescription: $scope.teamSelected.projectDescription
			}

			$scope.blockedTeamDetail = false;
		}
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		test team change
	*
	**/
	$scope.testChanges = function()
	{
		$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
		if($scope.changesToSave == false)
		{
			$scope.blockedTeamChoice = true;
		}
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		reset modifications
	*
	**/
	$scope.resetModifications = function()
	{
		$scope.team = angular.copy($scope.teamVerif);
		$scope.changesToSave = true;
		$scope.blockedTeamChoice = false;
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		save informations
	*
	**/
	$scope.saveTeamInformations = function()
	{
		LinkDBTeams.update($scope.team).$promise.then(function(response)
		{
			console.log(response);
			$scope.teamVerif = angular.copy($scope.team);
			$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
			$scope.blockedTeamChoice = false;

			$scope.resetListOfTeams();
		});
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@param		{object} user
	*	@description
	*		
	*	add user in team
	*
	**/
	$scope.addUserInTeam = function(user)
	{
		LinkDBBelongTo.save({idUser: user.idUser, idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
		{
			if(response.status == 0)
			{
				LinkDBBelongTo.query().$promise.then(function(response)
				{
					$scope.usersbyteams = angular.copy(response);
				});

				LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
				{
					$scope.usersnotinteam = angular.copy(response);
				});
			}
		})
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@param		{object} user
	*	@description
	*		
	*	remove user from team
	*
	**/
	$scope.removeUser = function(user)
	{
		console.log("user delete : ");
		console.log(user);

		LinkDBBelongToRemove.removeUser({idUser: user.idUser, idTeam: user.idTeam}).$promise.then(function(response)
		{
			if(response.status == 0)
			{
				console.log("response delete : ");
				console.log(response);
				$scope.usersbyteams = LinkDBBelongTo.query();
				LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
				{
					$scope.usersnotinteam = response;
				});
			}
		});
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		
	*	show user not in the team
	*
	**/
	$scope.showMembersNotInTheTeam = function()
	{
		LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
		{
			$scope.usersnotinteam = response;
		});

		$scope.addMember = true;
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		
	*	stop add member
	*
	**/
	$scope.endAdd = function()
	{
		$scope.addMember = false;
	}
	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		
	*	reset list of teams
	*
	**/
	$scope.resetListOfTeams = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response)
		{
			$scope.teams = angular.copy(response);
			var indice = 0;

			if($scope.team.idTeam != "")
			{
				for(var i = 0; i < $scope.teams.length; i++)
				{
					if($scope.teams[i].idTeam == $scope.team.idTeam)
					{
						indice = i;
					}
				}
				$scope.selected = $scope.teams[indice];
			}
		});
	}

});


/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		createTeam
*	@param		{object} $scope
*	@description
*		Controller used for page selection
*			this controller is used to switch inside main page between all differents options
*			 
*	
**/
app.controller('createTeam', function($scope, $cookieStore, LinkDBTeams, LinkDBBelongTo){

	$scope.empty = {
		teamName: "",
		projectName: "",
		projectDescription: ""
	}

	$scope.team = {
		teamName: "",
		projectName: "",
		projectDescription: ""
	}

	$scope.displayBtnCreate = false;

	/**
	*	@memberof 	TeamManagementPage
	*	@ngdoc 		function
	*	@description
	*		test team change
	*
	**/
	$scope.testChanges = function()
	{
		if($scope.team.teamName != "" && $scope.team.projectName != "" && $scope.team.projectDescription != "")
		{
			$scope.displayBtnCreate = true;
		}
	}

	$scope.createTheTeam = function()
	{
		LinkDBTeams.save($scope.team).$promise.then(function(response){
			console.log(response);

			LinkDBBelongTo.save({idUser: $cookieStore.get('UserIdUser'), idTeam: response.id}).$promise.then(function(response){
				$scope.team = angular.copy($scope.empty);
				$scope.modifyPageInside('team');
			});
		});
	}

});