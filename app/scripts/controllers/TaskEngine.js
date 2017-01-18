var app = angular.module('Suricat');
/**
*   @memberof   Suricat
*   @ngdoc      controllers
*   @name       taskManagementCtrl
*   @param      {object} $scope
*   @param      {object} LinkDBTask
*   @param      {object} LinkDBDepartment
*   @param      {object} LinkDBBelongTo
*   @param      {object} LinkDBKanbanTasks
*   @param      {object} LinkDBAttributeTaskUser
*   @description
*       Controller used for task management
*           
*           this controller allow :
*            
*           - create task
*   
**/
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
    /**
    *   @memberof   taskManagementCtrl
    *   @ngdoc      function
    *   @description
    *       used to create task for kanban used
    *
    */
    $scope.createTask = function ()
    {
        $scope.task.idTeam = $scope.selected.idTeam;
        $scope.task.idUser = $scope.user.idUser;
        console.log("$scope.task : ", $scope.task);

        LinkDBTask.save($scope.task).$promise.then(function (response) {
            $scope.task.idTask = response.idTask;
            LinkDBKanbanTasks.save($scope.task).$promise.then(function (response2) {
                if ($scope.task.idUser !== ""){
                    LinkDBAttributeTaskUser.save($scope.task).$promise.then(function (response3) {
                        $scope.$parent.tasksOfTheTeam = LinkDBKanbanTasks.query();
                    });
                }
            });
            
            //$scope.refreshKanban();
        });
    };
});
