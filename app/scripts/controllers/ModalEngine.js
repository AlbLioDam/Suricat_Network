var app = angular.module('Suricat');

/**
 *   @memberof   Suricat
 *   @ngdoc      controllers
 *   @name       ModCtrl
 *   @param      {object} $scope
 *   @param      {object} LinkDBTask
 *   @param      {object} LinkDBDepartment
 *   @param      {object} LinkDBBelongTo
 *   @param      {object} LinkDBKanbanTasks
 *   @param      {object} LinkDBAttributeTaskUser
 *   @description
 *       Controller used for ModalModify
 *           
 *           this controller allow :
 *            
 *           - Modify task
 *   
 **/
app.controller('ModCtrl', function ($scope, LinkDBTask, LinkDBDepartment, LinkDBBelongTo, LinkDBKanbanTasks, LinkDBChangeTaskToUser, LinkDBAttributeTaskUser) {
    $scope.showModal = false;
    $scope.task = {};
    $scope.durations = [1, 2, 3, 4, 5, 6, 7];
    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.states = ["To Do", "In Progress", "To Verify", "Done"];
    $scope.taskBefore = {};
    $scope.statusBefore = "";
    $scope.userBefore = "";

    $scope.emptyTaskUpdate = {
            taskName:       "",
            duration:       "",
            detail:         "",
            idUser:         "",
            status:         "",
            weight:         "",
            idTask:         "",
            idTeam:         "",
            lastname:       "",
            dateDeDebut:    "",
            dateDeFin:      ""
    };

    $scope.emptyTask =
            {
                taskName: "",
                detail: "",
                Duration: "",
                Weight: "",
                Status: "",
                idTeam: "",
                idUser: "",
                idTask:""
            };

    //toggleModal allows the modal to show up with a boolean true/false and pass in the scopes some info to fillup input select in kanban2.html

    $scope.toggleModal = function (task) {
        $scope.user = {};
        console.log("task params : ", task);
        $scope.task = task;
        $scope.taskBefore = task;
        $scope.statusBefore = task.status;
        $scope.departments = LinkDBDepartment.query();
        $scope.users = LinkDBBelongTo.query();
        $scope.attribute = LinkDBAttributeTaskUser.query();
        $scope.showModal = !$scope.showModal;
        $scope.user = 0;

        if(task.idUser != null)
        {
            $scope.userBefore = task.idUser;
        }
        else
        {
            $scope.userBefore = 0;
        }
        console.log("-------- $scope.userBefore : ", $scope.userBefore);
        
        console.log("$scope.taskBefore ouverture : ", $scope.taskBefore);
        //console.log("task : ", $scope.task);
    };

    $scope.refreshTasks = function(){
        $scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
    };

    $scope.updateTaskNow = function (task, user, state) {
        //console.log("$scope.task.status : ", $scope.task.status);
        console.log("-----------------------------------");
        console.log("$scope.task : ", $scope.task);
        console.log("task : ", task);
        console.log("$scope.taskBefore save : ", $scope.taskBefore);
        console.log("state : ", state);
        console.log("user : ", user);
        console.log("-----------------------------------");

        $scope.taskUpdate = {
            taskName:       task.taskName,
            duration:       task.duration,
            detail:         task.detail,
            idUser:         "",
            status:         task.status,
            weight:         task.weight,
            idTask:         task.idTask,
            idTeam:         task.idTeam,
            lastname:       task.lastname,
            dateDeDebut:    "",
            dateDeFin:      ""
        };

        if(user == 0 || user == null || angular.isUndefined(user))
        {
            $scope.taskUpdate.idUser = $scope.task.idUser;
        }
        else
        {
            $scope.taskUpdate.idUser = user.idUser;
        }
        console.log("-------- $scope.taskUpdate.idUser : ", $scope.taskUpdate.idUser);

        console.log("$scope.taskUpdate save : ", $scope.taskUpdate);

        console.log("$scope.statusBefore : ", $scope.statusBefore);
        console.log("$scope.taskUpdate.status : ", $scope.taskUpdate.status);

        if($scope.statusBefore == "To Do")
        {
            if($scope.taskUpdate.status == "To Do")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "In Progress" || $scope.taskUpdate.status == "To Verify")
            {
                $scope.taskUpdate.dateDeDebut = "now";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "Done")
            {
                $scope.taskUpdate.dateDeDebut = "now";
                $scope.taskUpdate.dateDeFin = "now";
            }
        }
        else if($scope.statusBefore == "In Progress")
        {
            if($scope.taskUpdate.status == "To Do")
            {
                $scope.taskUpdate.dateDeDebut = "null";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "In Progress")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "To Verify")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "Done")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "now";
            }
        }
        else if($scope.statusBefore == "To Verify")
        {
            if($scope.taskUpdate.status == "To Do")
            {
                $scope.taskUpdate.dateDeDebut = "null";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "In Progress")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "To Verify")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
            else if($scope.taskUpdate.status == "Done")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "now";
            }
        }
        else if($scope.statusBefore == "Done")
        {
            if($scope.taskUpdate.status == "To Do")
            {
                $scope.taskUpdate.dateDeDebut = "null";
                $scope.taskUpdate.dateDeFin = "null";
            }
            else if($scope.taskUpdate.status == "In Progress")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "null";
            }
            else if($scope.taskUpdate.status == "To Verify")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "null";
            }
            else if($scope.taskUpdate.status == "Done")
            {
                $scope.taskUpdate.dateDeDebut = "rien";
                $scope.taskUpdate.dateDeFin = "rien";
            }
        }

        // UPDATE OF THE ATTRIBUTES OF THE TASK IN 'TASK' TABLE
        LinkDBTask.update($scope.taskUpdate).$promise.then(function (response) {
            //console.log(response);
        });

        // UPDATE OF THE PROPERTIES OF THE TASK IN 'TODO' TABLE
        LinkDBKanbanTasks.update($scope.taskUpdate).$promise.then(function (resp) {
            //console.log(resp);
        });

        // CASE WHERE THE TASK HAS NO ONE ASSIGNED TO AT FIRST
        if($scope.userBefore == 0)
        {
            // CASE WHERE AN USER HAS BEEN ASSIGNED TO THE TASK BY THE FORM
            if(user != 0)
            {
                // CREATION OF THE USER FOR THE TASK IN 'HAVE' TABLE
                LinkDBAttributeTaskUser.save($scope.taskUpdate).$promise.then(function (response3) {
                    //console.log(response3);
                });
            }
        }
        // CASE WHERE THE TASK HAS SOMEONE ASSIGNED TO AT FIRST
        else
        {
            // CASE WHERE AN USER HAS BEEN CHANGED
            if(user != 0)
            {
                LinkDBChangeTaskToUser.update($scope.taskUpdate).$promise.then(function (response) {
                    //console.log(response);
                });
            }
            // CASE WHERE THE USER HAS BEEN REMOVED TO THE TASK
            else
            {
                // DELETE OF THE USER FOR THE TASK IN 'HAVE' TABLE
                LinkDBAttributeTaskUser.removeUserFromTask({idTask: $scope.taskUpdate.idTask, idTeam: $scope.taskUpdate.idTeam, idUser: $scope.userBefore}).$promise.then(function (response) {
                    //console.log(response);
                });
            }
        }

        //$scope.taskUpdate = angular.copy($scope.emptyTaskUpdate);
        //$scope.task = angular.copy($scope.emptyTask);
    };
});

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">{{ task.taskName }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
                '</div>' +
                '</div>' +
                '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.$watch(attrs.visible, function (value) {
                if (value === true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});