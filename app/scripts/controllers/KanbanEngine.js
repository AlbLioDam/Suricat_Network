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
app.controller('Kanban', function($scope, LinkDBKanbanTasks, $cookieStore){
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
});