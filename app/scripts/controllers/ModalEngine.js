var app = angular.module('Suricat');


app.controller('ModCtrl', function ($scope, LinkDBTask, LinkDBDepartment, LinkDBBelongTo, LinkDBKanbanTasks, LinkDBAttributeTaskUser) {
    $scope.showModal = false;
    $scope.task = {};
    $scope.toggleModal = function(task){
        $scope.task = task;
        $scope.departments = LinkDBDepartment.query();
        $scope.users = LinkDBBelongTo.query();
        $scope.showModal = !$scope.showModal;
        $scope.$parent.tasksOfTheTeam = LinkDBKanbanTasks.query();
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