'use strict';

/**
 * @ngdoc overview
 * @name suricatApp
 * @description
 * # suricatApp
 *
 * Main module of the application.
 */
var app = angular
  .module('Suricat'   , [
          'ngCookies' ,
          'ngResource',
          'ngRoute'   ,
          'ngSanitize',
          'ngMaterial',
          'ngMessages',
          'material.svgAssetsCache',
          'ui.bootstrap',
          'ngAnimate',
          '$idle',
          'ngIdle',          
  ]);

/*
app.controller('IdleWatch',function($scope,Idle,Keepalive, $cookieStore, $location,$routeParams){

this.$inject = ['$window'];

  $scope.started=false;
 console.log('lili');
  $scope.$on('IdleTimeout', function($scope,newPage,$window,$location){
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
    $scope.$parent.page='login';
    alert('DECO RAGE QUIT !');
    console.log('jysuis');
    
  })
})

*/

/*
app.run(function($rootScope){
  console.log('lili');
  $rootScope.$on('IdleTimeout', function(){
    console.log('ici');
    alert('t es partis :(');
  });
})
console.log("oula");
*/
/*
app.run(function($rootScope)
{
  var lastdigestrun = new Date();
  setInterval(function()
  {
    var now = Date.now();
    if(now - lastdigestrun > 5000) 
    {
      alert('t es partis :(');
    }
  }, 10000);
  $rootScope.$watch(function()
  {
    lastdigestrun = new Date();
  });
});
*/

app.controller('RefreshOverTime',['$scope', '$interval', 'LinkDBChat', '$cookieStore', function($scope, $interval, LinkDBChat, $cookieStore)
{
 
  var refreshChat;  var refreshChatNotifications;

  $scope.receiver   = "";
  $scope.idReceiver = "";
  $scope.idSender   = $cookieStore.get('UserIdUser');
  $scope.messages   = {};
  $scope.messages2  = LinkDBChat.query();

  $scope.fill = function(receiver, idReceiver)
  {
    $scope.receiver   = receiver;
    $scope.idReceiver = idReceiver;
    $scope.idSender   = $cookieStore.get('UserIdUser');
  }

  $scope.updateMessages = function()
  {
      LinkDBChat.query().$promise.then(function(response){
          $scope.messages = response;
      });
  }

  $scope.updateMessagesOnce = function()
  {
            LinkDBChat.query().$promise.then(function(response){
              var toCharge = false;
              for (var i = 0; i < response.length; i++)
              {
                if((response[i].id2 == $scope.idReceiver) && (response[i].id1 == $scope.idSender))
                {
                    //console.log("users OK");
                  if(angular.equals(response[i].readStatus, 0))
                  {
                    toCharge = true;
                    //console.log("readStatus OK");
                    LinkDBChat.updateReadStatus({idMessage: response[i].idMessage}).$promise.then(function(resp){
                        //console.log(resp);
                    });
                  }
                }
              }

              if(toCharge === true)
              {
                  LinkDBChat.query().$promise.then(function(resp){
                      $scope.messages = resp;
                  });
              }
            });
  }

  // START REFRESH OF CHAT
  $scope.startRefreshChat = function()
  {
      if(angular.isDefined(refreshChat)) return;

      LinkDBChat.query().$promise.then(function(response){
          $scope.messages = response;
      });

      refreshChat =
      $interval(function(){
        setTimeout(function(){
          $scope.updateMessagesOnce();
          $scope.updateMessages();
      }, 1000);
    }, 1000);
  }

  // STOP REFRESH OF CHAT
  $scope.stopRefreshChat = function()
  {
      if(angular.isDefined(refreshChat)) 
      {
          $interval.cancel(refreshChat);
          refreshChat = undefined;
      }
  }

  // START REFRESH OF CHAT NOTIFICATIONS
  $scope.startRefreshChatNotifications = function()
  {
      if(angular.isDefined(refreshChatNotifications)) return;

      var mySelf = $cookieStore.get('UserIdUser');
      
      refreshChatNotifications =
      $interval(function(){
        setTimeout(function(){

          var number = 0;
          for (var i = 0; i < $scope.messages.length; i++)
          {
            if(($scope.messages[i].id1 == mySelf) && ($scope.messages[i].readStatus == false))
            {
              number++;
            }
          }

          console.log("number : ", number);

          if(number > 0 && document.getElementById('backChatIcon') !== null)
          {
            if(document.getElementById('backChatIcon').style.backgroundColor == 'white')
            {
              document.getElementById('backChatIcon').style.backgroundColor = 'red';
            }
            else
            {
              document.getElementById('backChatIcon').style.backgroundColor = 'white';
            }
          }
          else if(number == 0 && document.getElementById('backChatIcon') !== null)
          {
            document.getElementById('backChatIcon').style.backgroundColor = 'white';
          }
        },1000);
      },1000);
  }

  // STOP REFRESH OF CHAT NOTIFICATIONS
  $scope.stopRefreshChatNotifications = function()
  {
      if(angular.isDefined(refreshChatNotifications)) 
      {
          $interval.cancel(refreshChatNotifications);
          refreshChatNotifications = undefined;
      }
  }

}]);

/*  app.directive('login', function () 
  {
    return({
            templateUrl: "views/login.html"
        });
  });
  app.directive('createUser', function () 
  {
    return({
            templateUrl: "views/createUser.html"
        });
  });*/
/*  .config(function ($routeProvider) {
    $routeProvider
      .when('/createUser', {
        templateUrl: 'views/createUser.html',
      })
      .when('/teamManagement', {
        templateUrl: 'views/teamManagement.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
