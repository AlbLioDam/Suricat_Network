var app = angular.module('Suricat');

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		Teams
*	@param		{object} $scope
*	@param		{object} LinkDBBelongToByUser used to interract  with REST server
*	@description
*		Controller used to get and manage team list actualities
*	
**/
app.controller('Teams',function($scope, LinkDBBelongToByUser){	
	console.log($scope.idUser);

	$scope.updateListOfTeams();
	/**
	*	@memberof 	Teams
	*	@ngdoc 		function
	*	@name 		updateListOfTeams
	*	@description
	*		get list of teams and put the list in the scope for team selection in team page
	*
	**/
	$scope.updateListOfTeams = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
		});
	};
});
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		TeamActualities
*	@param		{object} $interval
*	@param		{object} $scope
*	@param		{object} LinkDBTeamActualities
*	@param		{object} LinkDBBelongToByUser
*	@param		{object} LinkDBActualityId
*	@description
*		Controller used to get and manage team actualities
*	
**/
app.controller('TeamActualities',function($interval, $scope, LinkDBTeamActualities, LinkDBBelongToByUser, LinkDBActualityId){
	/**
	*	@memberof 	TeamActualities
	*	@ngdoc 		function
	*	@name 		updateTeamActualities
	*	@description
	*		used to update team actualities
	*
	**/
	$scope.updateTeamActualities = function()
	{
		$scope.listOfTeamActualities = LinkDBTeamActualities.query();
	};
	/**
	*	@memberof 	TeamActualities
	*	@ngdoc 		function
	*	@name 		updateListOfTeams
	*	@description
	*		used to update list of teams
	*
	**/
	$scope.updateListOfTeams = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
		});
	};

	/*-----------------------------------------
	 Prepare Json to Post with Team Actuality 
	 -----------------------------------------*/		
	$scope.newActu=
		{
			title:"",
			publication:"",
			photo :[],
			idTeam : "",
			idUser: $scope.idUser
		};

	/*-----------------------------------------
	 Here is the image management for actuality
	 @@
	 @ only use @ V2 (next software release) 
	 -----------------------------------------*/
	/*
	$scope.imageUpload = function(event){ 
	   var files = event.target.files; //FileList object 
	   var file = files[files.length-1];  
	   $scope.file = file;
	   var reader = new FileReader();
	   reader.onload = $scope.imageIsLoaded; 
	   reader.readAsDataURL(file); 
	}
	 
	$scope.imageIsLoaded = function(e){  
	   $scope.$apply(function() {
	   
		$scope.step = e.target.result; 
	   });
	} */
	/*-----------------------------------------*/


	/*------------------
	 Json Object to post
	 ------------------*/
	/**
	*	@memberof 	TeamActualities
	*	@ngdoc 		function
	*	@name 		postTeamActu
	*	@description
	*		used to get the scope info about team actuality
	*		then after object created, post it to the REST server
	*		through an http request (POST)
	*
	**/
	$scope.postTeamActu=function(selected)
	{
		console.log('idTeam : ', selected.idTeam);		
		$scope.newActu.photo = $scope.newActu.photo.base64;
		console.log('file is : ' );
		console.dir($scope.newActu.photo);


		$scope.newActu.idTeam=selected.idTeam;
		console.log('********************* JSON TO POST *************************' );
		console.dir($scope.newActu);

		console.log("scope : " + $scope.newActu.idTeam);
		LinkDBTeamActualities.post($scope.newActu).$promise.then(function(response){
			if(response.status == 0)
			{
				console.log("post message ok");
				$scope.listOfTeamActualities = LinkDBTeamActualities.query();
				$scope.newActu=
				{
					title:"",
					publication:"",
					photo : [],
					idTeam : "",
					idUser: $scope.idUser
				};
			}
			else
			{
				console.log("Erreur dans le post");
			}
		});
	};
	/**
	*	@memberof 	TeamActualities
	*	@ngdoc 		function
	*	@param		idActuality
	*	@name 		removeTeamActuality
	*	@description
	*		used to remove an team actuality
	*		post the request to the REST server
	*		through an http request
	*
	*/
	$scope.removeTeamActuality = function(idActuality)
	{
		LinkDBTeamActualities.remove({idActuality: idActuality}).$promise.then(function(response){
			console.log(response);

			LinkDBActualityId.remove({idActuality: idActuality}).$promise.then(function(response2){
				console.log(response2);
				$scope.listOfTeamActualities = LinkDBTeamActualities.query();
			});
		});
	}
});

/*----------------------------------------------
 Controller used to refresh the actuality flow
 ---------------------------------------------*/
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		refresh
*	@param		{object} $interval
*	@param		{object} $scope
*	@param		{object} LinkDBTeamActualities
*	@description
*		Controller used to refresh team actualities every 10s
*	
**/
app.controller('refresh',function($interval, $scope, LinkDBTeamActualities){
	$interval(function(){
		setTimeout(function(){
			var currentdate = new Date(); 
			var datetime = currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getFullYear() + " @ "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();
			$scope.message="Dernière actualisation le " + datetime;
			//$scope.listOfTeamActualities = LinkDBTeamActualities.query();
			$scope.$apply();
		},3000);
	},10000);
});