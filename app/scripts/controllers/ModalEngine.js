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
app.controller('ModCtrl', function ($scope, LinkDBTask, LinkDBDepartment, LinkDBBelongTo, LinkDBKanbanTasks, LinkDBAttributeTaskUser) {
    $scope.showModal = false;
    $scope.task = {};
    $scope.durations = [1, 2, 3, 4, 5, 6, 7];
    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.states = ["To Do", "In Progress", "To Verify", "Done"];
    
    
 //toggleModal allows the modal to show up with a boolean true/false and pass in the scopes some info to fillup input select in kanban2.html
 
    $scope.toggleModal = function(task){
        $scope.user = {};
        $scope.task = task;
        $scope.departments = LinkDBDepartment.query();
        $scope.users = LinkDBBelongTo.query();
        $scope.attribute = LinkDBAttributeTaskUser.query();
        $scope.showModal = !$scope.showModal;
        $scope.tasksOfTheTeam = LinkDBKanbanTasks.query();
        console.log($scope.task);
        console.log($scope.attribute);
    };
    
    $scope.updateTaskNow = function(task,user){
        
        
        $scope.taskUpdate = {
          taskName:task.taskName,
          duration:task.duration,
          detail:task.detail,
          idUser:user.idUser,
          status:task.status,
          weight:task.weight,
          idTask:task.idTask,
          idTeam:task.idTeam
        };
        
        LinkDBTask.update($scope.taskUpdate).$promise.then(function(response){
			console.log(response);
		});
        LinkDBAttributeTaskUser.update($scope.taskUpdate).$promise.then(function(response){
            console.log(response);
        });
        
        /* cette requête fait tout sauter
         * 
        LinkDBKanbanTasks.update($scope.taskUpdate).$promise.then(function(response){
            console.log(response);
        });
        */
        console.log($scope.taskUpdate);
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
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
          scope.$watch(attrs.visible, function(value){
          if(value === true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });