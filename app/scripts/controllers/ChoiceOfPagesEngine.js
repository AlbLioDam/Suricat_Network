var app = angular.module('Suricat');

// CONTROLLER : Switch between login page and main page
app.controller('choiceOfPages', function($scope, $cookieStore,$mdDialog){
	
	// DEFAULT PAGE
	$scope.page = "login";
	document.body.style.backgroundImage="url('/Suricat_Network/app/images/login.jpg')";

	$scope.modifyPage = function(newPage)
	{
		

		//document.body.style.backgroundImage="url('/Suricat_Network/app/images/"+newPage+".jpg')";
		//document.body.style.backgroundImage="url('/Suricat_Network/app/images/team.jpg')";
		//document.body.style.backgroundAttachment="fixed";
		$scope.page = newPage;

	}

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

	$scope.disconnect = function(newPage)
	{
		// STOP ALL REFRESHES RELATIVE TO THE CHAT
		$scope.stopRefreshChat();
		$scope.stopRefreshChatNotifications();

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
		$scope.startRefreshChat();
		$scope.startRefreshChatNotifications();
	}
});

// CONTROLLER : Switch inside main page between all differents options
app.controller('choiceOfInside', function($scope, $interval){
	$scope.inside = "team";

	$scope.modifyPageInside = function(newInside)
	{
		$scope.inside = newInside;
	}
});

// CONTROLLER : Switch inside main page between all differents options
app.controller('choiceOfInsideAdminUsers', function($scope){
	$scope.insideAdminUser = "updateUser";

	$scope.modifyPageInsideAdminUsers = function(newInsideAdminUser)
	{
		$scope.insideAdminUser = newInsideAdminUser;
	}
});