var app = angular.module('Suricat');

	/*---------------
	  Get Team List 
	 ---------------*/
app.controller('Teams',function($scope, LinkDBBelongToByUser){	
	console.log($scope.idUser);

	$scope.updateListOfTeams();

	$scope.updateListOfTeams = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
		});
	}
});

app.controller('TeamActualities',function($interval, $scope, LinkDBTeamActualities, LinkDBBelongToByUser){
	
	$scope.updateTeamActualities = function()
	{
		$scope.listOfTeamActualities = LinkDBTeamActualities.query();
	}

	$scope.updateListOfTeams = function()
	{
		LinkDBBelongToByUser.getTeamsOfUser({idUser: $scope.idUser}).$promise.then(function(response){
			$scope.listOfTeams = angular.copy(response);
		});
	}

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
});

/*----------------------------------------------
 Controller used to refresh the actuality flow
 ---------------------------------------------*/
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