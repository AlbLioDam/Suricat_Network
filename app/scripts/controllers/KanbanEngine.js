var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 

app.controller('Kanban', function($scope, LinkDBKanbanTasks){
	$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
});