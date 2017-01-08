var app = angular.module('Suricat');

	/*---------------
	  Get Team List 
	 ---------------*/
/*app.controller('Teams',function($scope, LinkDBTeams){	
	$scope.listOfTeams = LinkDBTeams.query();
	
});
*/

app.controller('LeisureActualities',function($interval, $scope, LinkDBLeisureActualities, LinkDBActualityId){
	$scope.listOfLeisureActualities = LinkDBLeisureActualities.query();
	//$scope.l = LinkDBLeisureActualities.query();
	/*console.log($scope.l[i].length);
	for (var i = 0; i < $scope.l.length; i++) 
	{
		console.log(i);
		console.log($scope.l[i].publication);
		$scope.l[i].publication = $scope.l[i].publication.replace(/\n/g, '<br/>');
		console.log($scope.l[i].publication);
  	}

  	$scope.listOfLeisureActualities = $scope.l;*/
	/*-----------------------------------------
	 Prepare Json to Post with Team Actuality 
	 -----------------------------------------*/
	$scope.newActu=
		{
			title:"",
			publication:"",
			photo :[],
			category:"",
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
	$scope.postTeamActu=function()
	{
		$scope.newActu.photo = $scope.newActu.photo.base64;
		console.log('file is : ' );
		//console.dir($scope.newActu.photo);
                

		//$scope.newActu.idTeam=selected.idTeam;
		console.log('********************* JSON TO POST *************************' );
		console.dir($scope.newActu);

		//console.log("scope : " + $scope.newActu.idTeam);
		LinkDBLeisureActualities.post($scope.newActu).$promise.then(function(response){
			if(response.status == 0)
			{
				console.log("post message ok");
				$scope.listOfLeisureActualities = LinkDBLeisureActualities.query();
				$scope.newActu =
				{
					title:"",
					publication:"",
					photo : [],
					category:"",
					idUser: $scope.idUser
				};
                                
                console.log($scope.listOfLeisureActualities);
			}
			else
			{
				console.log("Erreur dans le post");
			}
		});
	};

	$scope.removeLeisureActuality = function(idActuality)
	{
		LinkDBLeisureActualities.remove({idActuality: idActuality}).$promise.then(function(response){
			console.log(response);

			LinkDBActualityId.remove({idActuality: idActuality}).$promise.then(function(response2){
				console.log(response2);
				$scope.listOfLeisureActualities = LinkDBLeisureActualities.query();
			});
		});
	}
        
        /*------------------
	 function returninga glyphicon for every category
	 ------------------*/
    
         $scope.glyphicon =function(){
            switch ($scope.newActu.category) {
            case "Covoiturage":
                return "glyphicon glyphicon-road";
                break;
                
            default:
                
                break;
        }
         };
});

/*----------------------------------------------
 Controller used to refresh the actuality flow
 ---------------------------------------------*/
app.controller('refresh',function($interval, $scope, LinkDBLeisureActualities){
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
			$scope.$apply();
		},3000);
	},10000);	
});
