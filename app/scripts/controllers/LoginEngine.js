var app = angular.module('Suricat');

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		CheckLogin
*	@param		{object} $scope
*	@param		{object} LinkDBCheckLogin used to interract  with REST server
*	@param		{object} $timeout
*	@param		{object} $cookies
*	@param		{object} $cookieStore
*	@description
*		Login Controller used to send object with user login and password infos too REST server
*		From the Login Page (index.html)
*/
app.controller('CheckLogin',['$scope','LinkDBCheckLogin','$timeout','$cookies','$cookieStore', function($scope,LinkDBCheckLogin,$timeout,$cookies,$cookieStore){
	/**
	*	@memberof 	CheckLogin
	*	@ngdoc 		function
	*	@name 		verify
	*	@param		{object} $scope
	*	@param		{object} LinkDBCheckLogin used to interract  with REST server
	*	@param		{object} $timeout
	*	@param		{object} $cookies
	*	@param		{object} $cookieStore
	*	@description
	*		Verify is the function wich create the json object taken from login interface 
	*		to be verified in the database through the rest server
	*		The result contain:
	*	 - status 
	*			=> 1 = error
	*			=> 2 = Connexion establised
	*	 -  user details store in cookie
	*			=> idUser
	*			=> firstname
	*			=> lastname
	*			=> status
	*			=> corporatelifeRepresentative
	*			=> workCouncilRepresentative
	*/
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

