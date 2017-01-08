var app = angular.module('Suricat');

app.controller('chat',function($scope, $interval, LinkDB, LinkDBChat, LinkDBDepartment){

	$scope.departments 	= LinkDBDepartment.query();
	$scope.users 		= LinkDB.query();
	$scope.messages 	= LinkDBChat.query();
	$scope.receiver 	= "";
	$scope.idSender 	= $scope.idUser;

	$scope.send = 
	{
		idUser 			: "",
		idUser_Users 	: "",
		message 		: ""
	}

	$scope.saveMessage = function()
	{
		if($scope.send.message != "")
		{
			LinkDBChat.save($scope.send).$promise.then(function(response){
				console.log(response);
				$scope.send.message = "";
				$scope.messages = LinkDBChat.query();
			});
		}
	}

	$scope.showMessages = function(user)
	{
		$scope.idReceiver 			= user.idUser;
		$scope.send.idUser_Users 	= user.idUser;
		$scope.send.idUser 			= $scope.idUser;
		$scope.receiver 			= user.firstname + " " + user.lastname;
		$scope.messages 			= LinkDBChat.query();
	}

	$interval(function(){
		setTimeout(function(){
			$scope.$apply();
			console.log(new Date());
		},3000);
	},3000);
})