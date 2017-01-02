var app = angular.module('Suricat');

app.controller('taskManagementCtrl', function($scope, LinkDBTeams, LinkDBTask, LinkDBDepartment){

	//$scope.teams 		= LinkDBTeams.query();
	$scope.departments 	= LinkDBDepartment.query();
	$scope.durations 	= [1,2,3,4,5,6,7];
	$scope.weights 		= [1,2,3,4,5,6,7,8,9,10];
	$scope.states 		= ["To Do","In Progress","To Verify","Done"];
	
	$scope.task =
	{
		taskName 				: "",
		selectedDepartment		: "",
		detail 					: "",
		selectedDuration 		: "",
		selectedWeight 			: "",
		selectedState 			: ""
	};

	$scope.createTask = function (selectedDepartment, selectedDuration, selectedWeight, selectedState)
	{
		$scope.task.selectedDepartment 	= selectedDepartment.idDepartment;
		$scope.task.selectedDuration 	= selectedDuration;
		$scope.task.selectedWeight 		= selectedWeight;
		$scope.task.selectedState 		= selectedState;

		LinkDBTask.save($scope.task).$promise.then(function(response){
			console.log(response);
		});
	}
});