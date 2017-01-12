var app = angular.module('Suricat');

app.controller('taskManagementCtrl', function ($scope, LinkDBTask, LinkDBDepartment, LinkDBBelongTo, LinkDBKanbanTasks, LinkDBAttributeTaskUser) {

    //$scope.teams 		= LinkDBTeams.query();
    $scope.departments = LinkDBDepartment.query();
    $scope.users = LinkDBBelongTo.query();
    $scope.team = {};
    $scope.user = {};
    //$scope.team = $scope.selected;
    
    //console.log($scope.users);

    $scope.durations = [1, 2, 3, 4, 5, 6, 7];
    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.states = ["To Do", "In Progress", "To Verify", "Done"];

    $scope.task =
            {
                taskName: "",
                detail: "",
                Duration: "",
                Weight: "",
                Status: "",
                idTeam: "",
                idUser: $scope.user.idUser,
                idTask:""
            };

    $scope.createTask = function ()
    {
        $scope.task.idTeam = $scope.selected.idTeam;
        $scope.task.idUser = $scope.user.idUser;

        LinkDBTask.save($scope.task).$promise.then(function (response) {
            
            $scope.task.idTask = response.idTask;
            LinkDBKanbanTasks.save($scope.task);
            
            if ($scope.task.idUser !== ""){
                LinkDBAttributeTaskUser.save($scope.task);
            }

            $scope.refreshKanban();
        });
    };
});

app.controller('ModalCtrl', function($scope,$modal,$log){
    $scope.open = function(){
      var modelInstance = $modal.open({
          controller:'ModalInstance'
      })  
    };
});