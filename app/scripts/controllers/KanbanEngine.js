var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 

app.controller('Kanban', function($scope, LinkDBKanbanTasks, $cookieStore){
	$scope.updateKanbanTasks = function(selected)
	{
		if(selected != {})
		{
			$scope.choiceOfTeam = {};
			$scope.choiceOfTeam = selected;
            //$cookieStore.put('idTeam', selected.idTeam);
			$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
		}
	};

	$scope.refreshKanban = function()
	{
		$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
	};
});