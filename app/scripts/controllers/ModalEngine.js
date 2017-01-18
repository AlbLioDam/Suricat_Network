var app = angular.module('Suricat');


app.controller('ModCtrl', function ($scope, LinkDBTask, LinkDBDepartment, LinkDBBelongTo, LinkDBKanbanTasks, LinkDBAttributeTaskUser) {
    $scope.showModal = false;
    $scope.task = {};
    $scope.durations = [1, 2, 3, 4, 5, 6, 7];
    $scope.weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    $scope.states = ["To Do", "In Progress", "To Verify", "Done"];
    
    
    
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
          weight:task.weight
        };
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