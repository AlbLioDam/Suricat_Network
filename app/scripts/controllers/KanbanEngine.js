var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 

app.controller('Kanban', function($scope, LinkDBKanbanTasks, $cookieStore){
	$scope.updateKanbanTasks = function(selected)
	{
		if(selected != {})
		{
			$scope.choiceOfTeam = {};
			$scope.choiceOfTeam = selected;
			$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
		}
	};

	$scope.refreshKanban = function()
	{
		$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
	};
});

app.controller('ModalCtrl', function($scope){
    $scope.showModal = false;
    $scope.task = {};
    
    $scope.toggleModal = function(task){
        $scope.task = task;
        $scope.showModal = !$scope.showModal;
    };
});