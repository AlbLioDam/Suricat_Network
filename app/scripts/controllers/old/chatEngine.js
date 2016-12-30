var app = angular.module('Suricat');

// V2
app.controller('Chat', function($scope, LinkDBChat){
	$scope.messages = LinkDBChat.query();

	$scope.send = function(){
		var mess = $scope.mess;

			LinkDBChat.save({message: mess, idUser: 1, idUser_Users: 2}).$promise.then(function(response){
			console.log(response);
			$scope.mess = "";
			$scope.messages = LinkDBChat.query();
		});
	}
});