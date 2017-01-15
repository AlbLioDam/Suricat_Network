var app = angular.module('Suricat');

	/*---------------
	  Get Team List 
	 ---------------*/
/*app.controller('Teams',function($scope, LinkDBTeams){	
	$scope.listOfTeams = LinkDBTeams.query();
	
});
*/
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		WorkCouncilActualities
*	@param		{object} $interval
*	@param		{object} $scope
*	@param		{object} LinkDBWorkCouncilActualities
*	@param		{object} LinkDBActualityId
*	@description
*		Controller used for Enterprise work council actualities
*
*			this controller allow functions :
*			 
*			1- post work council actuality
*			2- remove work council actuality
*	
**/
app.controller('WorkCouncilActualities',function($interval, $scope, LinkDBWorkCouncilActualities, LinkDBActualityId){
	$scope.listOfWorkCouncilActualities = LinkDBWorkCouncilActualities.query();

	/*-----------------------------------------
	 Prepare Json to Post with Team Actuality 
	 -----------------------------------------*/		
	$scope.newActu=
		{
			title:"",
			publication:"",
			photo :[],
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
	*	@memberof 	WorkCouncilActualities
	*	@ngdoc 		function
	*	@description
	*		
	*		Post Work council actuality
	*
	**/
	$scope.postTeamActu=function()
	{
			
		$scope.newActu.photo = $scope.newActu.photo.base64;
		console.log('file is : ' );
		//console.dir($scope.newActu.photo);


		//$scope.newActu.idTeam=selected.idTeam;
		console.log('********************* JSON TO POST *************************' );
		console.dir($scope.newActu);

		//console.log("scope : " + $scope.newActu.idTeam);
		LinkDBWorkCouncilActualities.post($scope.newActu).$promise.then(function(response){
			if(response.status == 0)
			{
				console.log("post message ok");
				$scope.listOfWorkCouncilActualities = LinkDBWorkCouncilActualities.query();
				$scope.newActu=
				{
					title:"",
					publication:"",
					photo : [],
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
	*	@memberof 	WorkCouncilActualities
	*	@ngdoc 		function
	*	@description
	*		
	*		Remove Work council actuality
	*
	**/
	$scope.removeWorkCouncilActuality = function(idActuality)
	{
		LinkDBWorkCouncilActualities.remove({idActuality: idActuality}).$promise.then(function(response){
			console.log(response);

			LinkDBActualityId.remove({idActuality: idActuality}).$promise.then(function(response2){
				console.log(response2);
				$scope.listOfWorkCouncilActualities = LinkDBWorkCouncilActualities.query();
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
*	@param		{object} $scope
*	@param		{object} $interval
*	@param		{object} LinkDBWorkCouncilActualities
*	@description
*		Controller used for work council actuality refresh
*
*			this controller allow functions :
*			 
*			- refresh used every 10s
*	
**/
app.controller('refresh',function($interval, $scope, LinkDBWorkCouncilActualities){
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