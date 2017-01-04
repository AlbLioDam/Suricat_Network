var app = angular.module('Suricat');

// CONTROLLER : From the Login Page (index.html) send a post request 
// 				to the rest to check the login and password of the user.
app.controller('CheckLogin',['$scope','LinkDBCheckLogin','$timeout','$cookies','$cookieStore', function($scope,LinkDBCheckLogin,$timeout,$cookies,$cookieStore){
	// METHOD - VERIFY : Send the login and password to be verified in the database through the rest server
	$scope.verify = function()
	{
		var mail = $scope.email;
		var pwd = $scope.password;

		LinkDBCheckLogin.check({email: mail, password: pwd}).$promise.then(function(response){
			
			if(response.status == 0)
			{
				$scope.message = "Connexion établie";
				document.getElementById("cont").className = "container animated fadeOutDown";

				/*------------------------------------
				     Store user details in cookie
				-------------------------------------*/
				$cookieStore.put('UserIdUser', response.user.idUser);
				$cookieStore.put('UserFirstname', response.user.firstname);
				$cookieStore.put('UserLastname', response.user.lastname);
				$cookieStore.put('UserStatus', response.user.status);
				$cookieStore.put('UserCorporatelifeRepresentative', response.user.corporatelifeRepresentative);
				$cookieStore.put('UserWorkCouncilRepresentative', response.user.workCouncilRepresentative);

				$scope.loadCookieInformations();

				/*$cookieStore.put('Useremail', response.user.email);
				$cookieStore.put('UserCar', response.user.car);
				$cookieStore.put('UserCarsharing', response.user.carsharing);
				$cookieStore.put('UserActive', response.user.active);
				$cookieStore.put('UserAddress', response.user.address);
				$cookieStore.put('UserCity', response.user.city);
				$cookieStore.put('UserIdDepartment', response.user.idDepartment);*/

				$timeout(function()
				{
					$scope.modifyPage("mainPageSuricat");
				}, 1000);

				return response.user;
			}
			else
			{
				$scope.message = "Erreur dans les identifiants";
			}
		});
	}
}]);

