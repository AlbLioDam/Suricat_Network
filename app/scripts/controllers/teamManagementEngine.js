var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
app.controller('TeamManagementPage', function($scope, LinkDBTeams, LinkDB, LinkDBDepartment, LinkDBBelongTo, LinkDBBelongToByTeam, LinkDBNotBelongToByTeam)
{
	$scope.teams = LinkDBTeams.query();
	$scope.departments = LinkDBDepartment.query();
	//$scope.usersbyteams = LinkDBBelongTo.query();

	$scope.addMember = false;
	$scope.team = {};
	$scope.teamVerif = {};

	$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);

	$scope.showTeamDetail = function(selected)
	{
		console.log(selected);
		$scope.addMember = false;
		$scope.usersbyteams = LinkDBBelongTo.query();

		$scope.team = {
			idTeam: selected.idTeam,
			teamName: selected.teamName,
			projectName: selected.projectName,
			projectDescription: selected.projectDescription
		}

		$scope.teamVerif = {
			idTeam: selected.idTeam,
			teamName: selected.teamName,
			projectName: selected.projectName,
			projectDescription: selected.projectDescription
		}
	}

	$scope.testChanges = function()
	{
		$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
	}

	$scope.resetModifications = function()
	{
		$scope.team = angular.copy($scope.teamVerif);
		$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);
	}

	$scope.addUserInTeam = function(user, selected)
	{
		LinkDBBelongTo.save({idUser: user.idUser, idTeam: selected.idTeam}).$promise.then(function(response)
		{
				console.log(response);
				$scope.usersnotinteam = response;

/*				LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: selected.idTeam}).$promise.then(function(response)
				{
						console.log(response);
						$scope.usersnotinteam = response;
				});*/

				$scope.usersbyteams = LinkDBBelongTo.query();
		});
	}

	$scope.removeUserFromTeam = function(user)
	{
		console.log(user);
		//LinkDBBelongTo.removeUserFromTeam({idUser:user.idUser, idTeam: user.idTeam});
		//$scope.usersbyteams = LinkDBBelongTo.query();
	}

	$scope.showMembersNotInTheTeam = function(selected)
	{
		LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: selected.idTeam}).$promise.then(function(response)
		{
				console.log(response);
				$scope.usersnotinteam = response;
		});

		$scope.addMember = true;
	}

	$scope.endAdd = function()
	{
		$scope.addMember = false;
	}

});