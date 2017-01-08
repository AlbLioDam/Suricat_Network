var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 

app.controller('Kanban', function($scope, LinkDBKanbanTasks){
	$scope.updateKanbanTasks = function(selected)
	{
		if(selected != {})
		{
			$scope.choiceOfTeam = {};
			$scope.choiceOfTeam = selected;
			$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
		}
	}

	$scope.refreshKanban = function()
	{
		$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
	}
});