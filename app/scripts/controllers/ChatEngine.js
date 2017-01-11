var app = angular.module('Suricat');

app.controller('chat',function($scope, $interval, LinkDB, LinkDBChat, LinkDBDepartment){

	// LIST OF DEPARTMENTS (USED TO FILTER USERS)
	$scope.departments 	= LinkDBDepartment.query();

	// LIST OF USERS TO CHAT WITH
	$scope.users 		= LinkDB.query();

	// NAME OF RECEIVER USER
	$scope.receiver 	= "";

	// IDUSER OF THE CONNECTED USER (COOKIE)
	$scope.idSender 	= $scope.idUser;

	// OBJECT USED FOR THE INSERT IN MESSAGE TABLE
	$scope.send = 
	{
		idUser 			: "",
		idUser_Users 	: "",
		message 		: "",
		readStatus		: false
	}

	// METHOD : SAVE THE MESSAGE IN THE DB
	$scope.saveMessage = function()
	{
		if($scope.send.message != "")
		{
			LinkDBChat.save($scope.send).$promise.then(function(response){
				console.log(response);
				$scope.send.message = "";
				$scope.$parent.messages = $scope.updateMessages();
			});
		}
	}

	// METHOD : SHOW MESSAGES BETWEEN TWO PEOPLE
	$scope.showMessages = function(user)
	{
		$scope.$parent.messages = $scope.updateMessages();
		$scope.idReceiver 			= user.idUser;
		$scope.receiver 			= user.firstname + " " + user.lastname;
		$scope.fill($scope.receiver, $scope.idReceiver);
		$scope.send.idUser_Users 	= user.idUser;
		$scope.send.idUser 			= $scope.idUser;
	}

	$interval(function(){
        setTimeout(function(){
        	$scope.$parent.messages = $scope.updateMessages();
        },1000);
      },1000);

});