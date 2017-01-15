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
*	@name 		CorporateActualities
*	@param		{object} $scope
*	@param		{object} $interval
*	@param		{object} LinkDBCorpActualities
*	@param		{object} LinkDBActualityId
*	@description
*		Controller used for Corporate Actualities
*			
*			this controller allow :
*			 
*			1- post Actuality
*			2- remove actuality
*	
**/
app.controller('CorporateActualities',function($interval, $scope, LinkDBCorpActualities, LinkDBActualityId){
	$scope.listOfCorpActualities = LinkDBCorpActualities.query();

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
	*	@memberof 	CorporateActualities
	*	@ngdoc 		function
	*	@description description :
	*
	*		used to post Actuality
	*		
	*
	**/
	$scope.postTeamActu=function()
	{
		$scope.newActu.photo = $scope.newActu.photo.base64;
		console.log('file is : ' );
		console.dir($scope.newActu.photo);

		//$scope.newActu.idTeam=selected.idTeam;
		console.log('********************* JSON TO POST *************************' );
		console.dir($scope.newActu);

		//console.log("scope : " + $scope.newActu.idTeam);
		LinkDBCorpActualities.post($scope.newActu).$promise.then(function(response){
			if(response.status == 0)
			{
				console.log("post message ok");
				$scope.listOfCorpActualities = LinkDBCorpActualities.query();
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
	*	@memberof 	CorporateActualities
	*	@ngdoc 		function
	*	@description description :
	*
	*		used to remove Actuality
	*		
	*
	**/
	$scope.removeCorporateLifeActuality = function(idActuality)
	{
		LinkDBCorpActualities.remove({idActuality: idActuality}).$promise.then(function(response){
			console.log(response);

			LinkDBActualityId.remove({idActuality: idActuality}).$promise.then(function(response2){
				console.log(response2);
				$scope.listOfCorpActualities = LinkDBCorpActualities.query();
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
*	@param		{object} LinkDBCorpActualities
*	@description
*		Controller used for refresh Actualities
*			
*			this controller allow actualities flow refresh every 10s
*	
**/
app.controller('refresh',function($interval, $scope, LinkDBCorpActualities){
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
 /**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		toggleCtrl
*	@param		{object} $scope
*	@description
*		Controller used for toggleCtrl management
*			
*	
**/
app.controller('toggleCtrl', function($scope) {
  
  // BUTTONS ======================

  $scope.isCollapsed = false;
  
  $scope.oneAtATime = true;

  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
});
