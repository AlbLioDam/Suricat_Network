var app = angular.module('Suricat');

app.controller('taskManagementCtrl', function($scope, LinkDBTask, LinkDBDepartment){

	//$scope.teams 		= LinkDBTeams.query();
	$scope.departments 	= LinkDBDepartment.query();
	$scope.durations 	= [1,2,3,4,5,6,7];
	$scope.weights 		= [1,2,3,4,5,6,7,8,9,10];
	$scope.states 		= ["To Do","In Progress","To Verify","Done"];
	
	$scope.task =
	{
		taskName            : "",
		Department          : "",
		detail              : "",
		Duration            : "",
		Weight              : "",
		Status              : ""
	};

	$scope.createTask = function (selectedDepartment, selectedDuration, selectedWeight, selectedState)
	{
		$scope.task.Department 	= selectedDepartment.idDepartment;
		$scope.task.Duration 	= selectedDuration;
		$scope.task.Weight 		= selectedWeight;
		$scope.task.Status 		= selectedState;

		LinkDBTask.save($scope.task).$promise.then(function(response){
			console.log(response);
            console.log($scope.task);
            $scope.refreshKanban();
		});
                
	};
});