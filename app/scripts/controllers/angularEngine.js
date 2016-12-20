var app = angular.module('Suricat');

// CONTROLLER : Random turnover of background picture 
app.controller('PageOptions', function($scope){
	// Generate random number 1 to 9
	var randomPicture = Math.floor((Math.random()*8)+1);

	// Put the number of the picture into the path. 
	$scope.path = "images/" + randomPicture + ".jpg";
});


// CONTROLLER : From the Login Page (index.html) send a post request 
// 				to the rest to check the login and password of the user.
app.controller('CheckLogin', function($scope, LinkDBCheckLogin, $timeout){
	// METHOD - VERIFY : Send the login and password to be verified in the database through the rest server
	$scope.verify = function(){
		var mail = $scope.email;
		var pwd = $scope.password;

		LinkDBCheckLogin.check({email: mail, password: pwd}).$promise.then(function(response){
			console.log(response);
			if(response.status == 0)
			{
				$scope.message = "Connexion établie";
				document.getElementById("cont").className = "container animated fadeOutDown";
				$timeout(function(){
					document.getElementById("changePage").click();
				}, 1000);
			}
			else
			{
				$scope.message = "Erreur dans les identifiants";
			}
		});
	}
});

// V2
app.controller('Chat', function($scope, LinkDBChat){
	$scope.messages = LinkDBChat.query();

	$scope.send = function(){
		var mess = $scope.mess;

			LinkDBChat.save({message: mess, idUser: 1, idUser_Users: 2}).$promise.then(function(response){
			console.log(response);
			$scope.mess = "";
			$scope.messages = LinkDBChat.query();
		});
	}
});