var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
app.controller('TeamManagementPage', function($scope, LinkDBTeams, LinkDB, LinkDBDepartment, LinkDBBelongTo, LinkDBNotBelongToByTeam, NotBelongToByTeam, LinkDBBelongToRemove)
{
	LinkDBTeams.query().$promise.then(function(response)
	{
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

	$scope.testChanges = function()
	{
		$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
		if($scope.changesToSave == false)
		{
			$scope.blockedTeamChoice = true;
		}
	}

	$scope.resetModifications = function()
	{
		$scope.team = angular.copy($scope.teamVerif);
		$scope.changesToSave = true;
		$scope.blockedTeamChoice = false;
	}

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

	$scope.showMembersNotInTheTeam = function()
	{
		LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
		{
			$scope.usersnotinteam = response;
		});

		$scope.addMember = true;
	}

	$scope.endAdd = function()
	{
		$scope.addMember = false;
	}

	$scope.resetListOfTeams = function()
	{
		LinkDBTeams.query().$promise.then(function(response)
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