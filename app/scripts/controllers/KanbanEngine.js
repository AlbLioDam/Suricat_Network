var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		Kanban
*	@param		{object} $scope
*	@param		{object} LinkDBKanbanTasks
*	@param		{object} $cookieStore
*	@description
*		Controller used for 'kanban'
*			
*			this controller allow :
*			 
*			1- update kanban
*			2- refresh kanban
*	
**/
app.controller('Kanban', function($scope, LinkDBKanbanTasks, LinkDBAttributeTaskUser, $cookieStore, $interval){
	/**
	*	@memberof 	Kanban
	*	@ngdoc 		function
	*	@param		{object} selected	
	*	@description description :
	*
	*		this function is used to update kanban content
	*		
	*
	**/
	$scope.updateKanbanTasks = function(selected)
	{
		if(selected != {})
		{
			$scope.choiceOfTeam = {};
			$scope.choiceOfTeam = selected;
            console.log($scope.tasksOfTheTeam);
		}
	};
	/**
	*	@memberof 	Kanban
	*	@ngdoc 		function	
	*	@description description :
	*
	*		this function is used to refresh kanban content
	*		
	*
	**/
	$scope.refreshKanban = function()
	{
		LinkDBKanbanTasks.query().$promise.then(function(response){
			if(angular.equals($scope.tasksOfTheTeam, response) != true)
			{
				$scope.tasksOfTheTeam = response;
			}
		});
	};

	/**
	*	@memberof 	Kanban
	*	@ngdoc 		function	
	*	@description description :
	*
	*		this function is used to delete a task in a team and the member attributed to
	*		
	*
	**/
	$scope.deleteTask = function(task)
	{
		LinkDBKanbanTasks.removeTaskFromTeam({idTask: task.idTask, idTeam: task.idTeam}).$promise.then(function(response){
			console.log(response);
		});
		LinkDBAttributeTaskUser.removeUserFromTask({idTask: task.idTask, idTeam: task.idTeam, idUser: task.idUser}).$promise.then(function(resp){
			console.log("resp : ", resp);
		});
	}

	$interval(function(){
        setTimeout(function(){
          $scope.refreshKanban();
      }, 1000);
    }, 1000);
});