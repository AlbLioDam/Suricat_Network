var app = angular.module('Suricat');

app.controller('chat',function($scope, $interval, LinkDB, LinkDBChat, LinkDBDepartment){

	$scope.departments 	= LinkDBDepartment.query();
	$scope.users 		= LinkDB.query();
	//$scope.messages 	= $scope.$parent.messages;
	$scope.receiver 	= "";
	$scope.idSender 	= $scope.idUser;
	$scope.temp = [{}];

	$scope.send = 
	{
		idUser 			: "",
		idUser_Users 	: "",
		message 		: "",
		readStatus		: false
	}

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

	$scope.showMessages = function(user)
	{
		$scope.idReceiver 			= user.idUser;
		$scope.send.idUser_Users 	= user.idUser;
		$scope.send.idUser 			= $scope.idUser;
		$scope.receiver 			= user.firstname + " " + user.lastname;
		$scope.fill($scope.receiver, $scope.idReceiver);
	}

	//$scope.startRefreshChat();

/*	$scope.markMessagesToRead = function()
	{
		console.log("taille : ", $scope.messages.length);
		for (var i = 0; i < $scope.messages.length; i++) 
		{
			if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
			{
				console.log("A changer : ", $scope.messages[i].message);
				LinkDBChat.updateReadStatus({idMessage : $scope.messages[i].idMessage});
			}
		}
		$scope.messages = LinkDBChat.query();
	}*/

/*	$interval(function(){
		setTimeout(function(){
			if($scope.receiver != "")
			{
				console.log("taille : ", $scope.messages.length);
				for (var i = 0; i < $scope.messages.length; i++)
				{
					if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
					{
						// Change status of messages to already read
						LinkDBChat.updateReadStatus({idMessage : $scope.messages[i].idMessage});
					}
				}
			}
			//$scope.messages = LinkDBChat.query();
			LinkDBChat.query().$promise.then(function(response){
				console.log("response", response.length);
				console.log("messages", $scope.messages.length);
				if($scope.receiver != "")
				{
					$scope.FiltredResponse = [{}];
					for (var i = 0; i < response.length; i++)
					{
						if((response[i].idUser == $scope.idReceiver) && (response[i].idUser_Users == $scope.idSender) && (response[i].readStatus == false))
						{
							$scope.FiltredResponse.push(response[i]);
							//console.log($scope.FiltredResponse);
						}
					}

					$scope.FiltredMessages = [{}];
					for (var i = 0; i < $scope.messages.length; i++) 
					{
						if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
						{
							$scope.FiltredMessages.push($scope.messages[i]);
							//console.log($scope.FiltredMessages);
						}
					}

/*					$scope.result2 = angular.equals($scope.messages, response);
					if($scope.result2 == false)
					{
						$scope.messages = response;
						$scope.result = angular.equals($scope.FiltredMessages, $scope.FiltredResponse);
						//console.log($scope.result);
						if($scope.result == false)
						{*/
							//$scope.messages = response;
/*						}
					}
				}
			});
		},1000);
	},1000);*/
	// Penser à arrêter le reload quand on change de page
});