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


    //toggleModal allows the modal to show up with a boolean true/false and pass in the scopes some info to fillup input select in kanban2.html

    $scope.toggleModal = function (task) {
        $scope.user = {};
        $scope.task = task;
        $scope.departments = LinkDBDepartment.query();
        $scope.users = LinkDBBelongTo.query();
        $scope.attribute = LinkDBAttributeTaskUser.query();
        $scope.showModal = !$scope.showModal;
        console.log($scope.task);
        console.log($scope.attribute);
    };

    $scope.refreshTasks = function(){
        $scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
    };

    $scope.updateTaskNow = function (task, user) {

        $scope.taskUpdate = {
            taskName: task.taskName,
            duration: task.duration,
            detail: task.detail,
            idUser: "",
            status: task.status,
            weight: task.weight,
            idTask: task.idTask,
            idTeam: task.idTeam,
            lastname: task.lastname
        };

        // UPDATE OF THE ATTRIBUTES OF THE TASK IN 'TASK' TABLE
        LinkDBTask.update($scope.taskUpdate).$promise.then(function (response) {
            console.log(response);
        });

        // UPDATE OF THE PROPERTIES OF THE TASK IN 'TODO' TABLE
        LinkDBKanbanTasks.update($scope.taskUpdate).$promise.then(function (resp) {
            console.log(resp);
        });

        console.log("user : ", user);
        console.log("$scope.task : ", $scope.task);

        // CASE WHERE THE TASK HAS NO ONE ASSIGNED TO AT FIRST
        if($scope.task.lastname == null)
        {
            // CASE WHERE AN USER HAS BEEN ASSIGNED TO THE TASK BY THE FORM
            if(user != null)
            {
                $scope.taskUpdate.idUser = user.idUser;
                // CREATION OF THE USER FOR THE TASK IN 'HAVE' TABLE
                LinkDBAttributeTaskUser.save($scope.taskUpdate).$promise.then(function (response3) {
                    console.log(response3);
                });
            }
        }
        // CASE WHERE THE TASK HAS SOMEONE ASSIGNED TO AT FIRST
        else
        {
            // CASE WHERE AN USER HAS BEEN ASSIGNED TO THE TASK BY THE FORM
            if(user != null)
            {
                $scope.taskUpdate.idUser = user.idUser;
                LinkDBChangeTaskToUser.update($scope.taskUpdate).$promise.then(function (response) {
                    console.log(response);
                });
            }
            // CASE WHERE THE USER HAS BEEN REMOVED TO THE TASK BY THE FORM
            else
            {
                // DELETE OF THE USER FOR THE TASK IN 'HAVE' TABLE
                LinkDBAttributeTaskUser.removeUserFromTask({idTask: $scope.taskUpdate.idTask, idTeam: $scope.taskUpdate.idTeam}).$promise.then(function (response) {
                    console.log(response);
                });
            }
        }
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