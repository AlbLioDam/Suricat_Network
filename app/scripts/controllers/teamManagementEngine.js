var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
app.controller('TeamManagementPage', function($scope, LinkDBTeams, LinkDB, LinkDBDepartment, LinkDBBelongTo, LinkDBNotBelongToByTeam, NotBelongToByTeam, LinkDBBelongToRemove)
{
	$scope.teams 		= LinkDBTeams.query();
	$scope.departments 	= LinkDBDepartment.query();
	$scope.usersbyteams = LinkDBBelongTo.query();

	$scope.addMember = false;

	$scope.changesToSave = angular.equals($scope.team, $scope.teamVerif);

	$scope.showTeamDetail = function(selected)
	{
		if(selected.idTeam != null)
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

	$scope.saveTeamInformations = function()
	{
		LinkDBTeams.update($scope.team).$promise.then(function(response)
		{
			console.log(response);
		});
	}

	$scope.addUserInTeam = function(user)
	{
		//console.log(user.idUser);
		//console.log($scope.teamSelected.idTeam);
		LinkDBBelongTo.save({idUser: user.idUser, idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
		{
			if(response.status == 0)
			{
				$scope.usersbyteams = LinkDBBelongTo.query();
				LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
				{
					//console.log(response);
					$scope.usersnotinteam = response;
				});
			}
		})
	}

	$scope.removeUser = function(user)
	{
		console.log("user delete : ");
		console.log(user);
		//var obj = {idUser: user.idUser, idTeam: user.idTeam}

		LinkDBBelongToRemove.removeUser({idUser: user.idUser, idTeam: user.idTeam}).$promise.then(function(response)
		{
			if(response.status == 0)
			{//console.log(obj.idUser);
			//console.log(obj.idTeam);
			console.log("response delete : ");
			console.log(response);
			$scope.usersbyteams = LinkDBBelongTo.query();
		}
		});
	}

	$scope.showMembersNotInTheTeam = function()
	{
		LinkDBNotBelongToByTeam.getUsersNotInTeam({idTeam: $scope.teamSelected.idTeam}).$promise.then(function(response)
		{
			//console.log(response);
			$scope.usersnotinteam = response;
			/*			
			var size = $scope.usersnotinteam.length;
			console.log(size);
			var size1 = Math.round(($scope.usersnotinteam.length/3) * 10) / 10;
			console.log(size1);
			*/
		});

		$scope.addMember = true;
	}

	$scope.endAdd = function()
	{
		$scope.addMember = false;
	}

});