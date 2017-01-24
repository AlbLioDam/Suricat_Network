var app = angular.module('Suricat');


app.run(['Idle',function(Idle){
  Idle.watch();
}]);

app.config(function (IdleProvider, KeepaliveProvider)
{
  IdleProvider.idle(15*60);
  IdleProvider.timeout(5);
  KeepaliveProvider.interval(15*60);
});


// CONTROLLER : Switch between login page and main page
/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		choiceOfPages
*	@param		{object} $scope
*	@param		{object} $cookieStore
*	@param		{object} $mdDialog
*	@description
*		Controller used for page selection
*			this controller init the background image
*			this controller allow :change page function
*			 
*			1- change page function
*			2- show trademark
*			3- show confirmation dialogbox
*			4- disconnection
*			5- load cookies
*			6- modify page inside page
*			7- modify page inside page for Aministrators
*	
**/
app.controller('choiceOfPages', function($scope,Idle, $cookieStore,$mdDialog,Keepalive, $route,$routeParams,$window){
	
	// DEFAULT PAGE
	$scope.page = "login";
	document.body.style.backgroundImage="url('/Suricat_Network/app/images/login.jpg')";
	
	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function
	*	@param		newPage	
	*	@description description :
	*
	*		this function is used to modify page content
	*		
	*
	**/
	$scope.modifyPage = function(newPage)
	{
		//document.body.style.backgroundImage="url('/Suricat_Network/app/images/"+newPage+".jpg')";
		//document.body.style.backgroundImage="url('/Suricat_Network/app/images/team.jpg')";
		//document.body.style.backgroundAttachment="fixed";
		$scope.page = newPage;
	};
	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function
	*		
	*	@description description :
	*
	*		this function is used to detect idle timeout.
	*		After time elapsed, user is disconnected.
	*
	*	1- the Angular app is restarted
	*	2- an alert box advise user he has been disconnected	
	*	3- then call disconnect function to route user to login page.
	*		 
	*		
	*
	**/
  $scope.$on('IdleTimeout', function()
  {
 	$window.location.reload();
    alert('Vous avez été déconnecté suite à une trop logue inactivité !');  
  })

	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function
	*	@param		ev	
	*	@description description :
	*
	*		this function is used to show trademark suricat and conceptors
	*		
	*
	**/
	$scope.showTrademark = function(ev) 
	{
    	$mdDialog.show(
	      	$mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Future Registered trademarks')
	        .textContent('Alban / Lionel / Damien, AlbLioDam, and Suricat will be protected by intellectual property rights.')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('ok !')
	        .targetEvent(ev)
    	);
  	};
	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function
	*	@param		ev	
	*	@description description :
	*
	*		this function is used to show dialogbox with confirmation required
	*		
	*
	**/
	$scope.showConfirm = function(ev) 
	{
    	var confirm = $mdDialog.confirm()
          .title('Veuillez confirmer')
          .textContent('Souhaitez-vous vous déconnecter ?')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Oui')
          .cancel('Non');

    	$mdDialog.show(confirm).then(function() 
    	{
      		$scope.disconnect('login');
    	}, function() 
    	{
	      //only close the dialog box.
	    });
  	};
	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function
	*	@param		newPage	
	*	@description description :
	*
	*		this function is used to disconnect user from Suricat 
	*		At user disconnection, cookies will be removed.
	*		And navigation will be redirect to login page.
	*
	**/
	$scope.disconnect = function(newPage)
	{
		// STOP ALL REFRESHES RELATIVE TO THE CHAT
		//$scope.stopRefreshChat();
		//$scope.stopRefreshChatNotifications();

		// REMOVE THE USER'S COOKIE
		$cookieStore.remove('UserFirstname');
		$cookieStore.remove('UserLastname');
		$cookieStore.remove('UserIdUser');
		$cookieStore.remove('UserStatus');
		$cookieStore.remove('UserCorporatelifeRepresentative');
		$cookieStore.remove('UserWorkCouncilRepresentative');

		// RETURN ON LOGIN PAGE
		$scope.page = newPage;
	}

	// METHOD : GET INTEL FROM THE COOKIE
	/**
	*	@memberof 	choiceOfPages
	*	@ngdoc 		function	
	*	@description description :
	*
	*		this function is used to load cookies.
	*
	**/
	$scope.loadCookieInformations = function()
	{
		$scope.firstname 					= $cookieStore.get('UserFirstname');
		$scope.lastname 					= $cookieStore.get('UserLastname');
		$scope.idUser 						= $cookieStore.get('UserIdUser');
		$scope.status 						= $cookieStore.get('UserStatus');
		$scope.access = null;
		$scope.corporateLifeRepresentative 	= $cookieStore.get('UserCorporatelifeRepresentative');
		$scope.workCouncilRepresentative 	= $cookieStore.get('UserWorkCouncilRepresentative');
		
		if($scope.status == "Chef de projet" || $scope.status == "Admin")
		{
			$scope.access = true;
		}
		else
		{
			$scope.access = false;
		}

		console.log("access : ", $scope.access);
		console.log("idUser : ", $scope.idUser);

		// LAUNCH REFRESHES RELATIVE TO THE CHAT
		//$scope.startRefreshChat();
		//$scope.startRefreshChatNotifications();
	}
});


/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		choiceOfInside
*	@param		{object} $scope
*	@param		{object} $interval
*	@description
*		Controller used for page selection inside main page. 
*			
*			this controller allow :change page function :
*			 
*			- modify page function inside main page between all differents options
*	 
**/
app.controller('choiceOfInside', function($scope, $interval,$cookieStore){
	$scope.inside = "team";
	/**
	*	@memberof 	choiceOfInside
	*	@ngdoc 		function
	*	@param		newInside	
	*	@description modify page inside
	*
	*		modify page inside
	*
	**/
	$scope.modifyPageInside = function(newInside)
	{
		$scope.inside = newInside;
	}
});

/**
*	@memberof 	Suricat
*	@ngdoc 		controllers
*	@name 		choiceOfInsideAdminUsers
*	@param		{object} $scope
*	@description
*		Controller used for page selection
*			this controller is used to switch inside main page between all differents options
*			 
*	
**/
app.controller('choiceOfInsideAdminUsers', function($scope){
	$scope.insideAdminUser = "createUser";
	/**
	*	@memberof 	choiceOfInsideAdminUsers
	*	@ngdoc 		function
	*	@param		newInsideAdminUser	
	*	@description description :
	*
	*		modify page inside admin user
	*
	**/
	$scope.modifyPageInsideAdminUsers = function(newInsideAdminUser)
	{
		$scope.insideAdminUser = newInsideAdminUser;
	}
});