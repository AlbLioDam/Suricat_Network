var app = angular.module('Suricat');

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		chat
*	@param		{object} $scope
*	@param		{object} $interval
*	@param		{object} LinkDB
*	@param		{object} LinkDBChat
*	@param		{object} LinkDBDepartment
*	@description
*		Controller used for chat
*			this controller init the chat empty
*			this controller allow 2 functions :
*			 
*			1- Save message in datablase
*			2- show message to display the conversation between 2 people
*	
**/
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

	/**
	*	@memberof 	chat
	*	@ngdoc 		function
	*	@param		response
	*	@param		$scope.send
	*	@description
	*		this function is used to save the message in database
	*
	**/
	$scope.saveMessage = function()
	{
		if($scope.send.message != "")
		{
			LinkDBChat.save($scope.send).$promise.then(function(response){
				console.log(response);
				$scope.send.message = "";
				$scope.updateMessages();
			});
		}
	}

	/**
	*	@memberof 	chat
	*	@ngdoc 		function
	*	@param		user	
	*	@description
	*		this function is used to show the message in conversation
	*		
	*
	**/
	$scope.showMessages = function(user)
	{
		//$scope.updateMessages();
		//$scope.$parent.messages = $scope.updateMessages();
		$scope.idReceiver 			= user.idUser;
		$scope.receiver 			= user.firstname + " " + user.lastname;
		$scope.fill($scope.receiver, $scope.idReceiver);
		$scope.send.idUser_Users 	= user.idUser;
		$scope.send.idUser 			= $scope.idUser;
		//$scope.updateMessagesOnce();
		//$scope.updateMessages();
	}

/*	$interval(function(){
        setTimeout(function(){
        	$scope.$parent.messages = $scope.updateMessages();
        },1000);
      },1000);*/

});