var app = angular.module('Suricat');

app.controller('Teams',function($scope, LinkDBTeams){	
	$scope.listOfTeams = LinkDBTeams.query();
	
});

app.controller('TeamActualities',function($interval, $scope, LinkDBTeamActualities){
	$scope.listOfTeamActualities = LinkDBTeamActualities.query();

	//-- Prepare Json to Post with Team Actuality --//		
	$scope.newActu=
		{
			title:"",
			publication:"",
			photo :[],
			idTeam : "",
			idUser: 1
		};


	/*	V2
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

	//-- Post Json --//
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
					idUser: 1
				};
			}
			else
			{
				console.log("Erreur dans le post");

			}
		});

	};

	$interval(function(){
		var currentdate = new Date(); 
		var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
		$scope.message="Dernière actualisation le " + datetime;
		$scope.listOfTeamActualities = LinkDBTeamActualities.query();
	},10000);	

});



