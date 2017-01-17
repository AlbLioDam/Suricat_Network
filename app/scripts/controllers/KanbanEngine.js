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
app.controller('Kanban', function($scope, LinkDBKanbanTasks, LinkDBAttributeTaskUser, $cookieStore){
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
			$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
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
		$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
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
			if(response.status == 0)
			{
				LinkDBAttributeTaskUser.removeUserFromTask({idTask: task.idTask, idTeam: task.idTeam}).$promise.then(function(resp){
					console.log(resp);
					$scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
				});
			}
		});
	}
});