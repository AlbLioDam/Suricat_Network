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
          'ngAnimate'
  ]);

app.controller('RefreshOverTime',['$scope', '$interval', 'LinkDBChat', '$cookieStore', function($scope, $interval, LinkDBChat, $cookieStore)
{
  var refreshChat;
  var refreshChatNotifications;

  //$scope.messages   = LinkDBChat.query();
  $scope.receiver   = "";
  $scope.idReceiver = "";
  $scope.idSender   = $cookieStore.get('UserIdUser');
  $scope.messages   = {};
  $scope.messages2  = LinkDBChat.query();

  $scope.fill = function(receiver, idReceiver)
  {
    $scope.receiver   = receiver;
    $scope.idReceiver = idReceiver;
    //console.log("1 ---- ", $scope.receiver);
    //console.log("2 ---- ", $scope.idReceiver);
  }

  $scope.updateMessages = function()
  {
    $scope.messages = LinkDBChat.query().$promise.then(function(response){
        return $scope.messages;
    });
  }

  // START REFRESH OF CHAT
  $scope.startRefreshChat = function()
  {
      if(angular.isDefined(refreshChat)) return;

      LinkDBChat.query().$promise.then(function(response){
          $scope.messages = response;
          console.log("First response : ", response);
          console.log("First size : ", response.length);
      });

      refreshChat =
      $interval(function(){
        setTimeout(function(){

          LinkDBChat.query().$promise.then(function(response){
            //if($scope.receiver != "")
            //{
            console.log("Second response : ", response);
            console.log("Second size : ", response.length);
            if(angular.equals($scope.messages, response) == false)
            {
              var numberOfChanges = 0;
              //console.log("response ---- ", response.length);
              for (var i = 0; i < response.length; i++)
              {
                if((response[i].idUser == $scope.idReceiver) && (response[i].idUser_Users == $scope.idSender))
                {
                    console.log("users OK");
                  if(angular.equals(response[i].readStatus, 0))
                  {
                    console.log("readStatus OK");
                    LinkDBChat.updateReadStatus({idMessage: response[i].idMessage}).$promise.then(function(resp){
                        console.log(resp);
                    });
                    numberOfChanges++;
                  }
                }
              }

              console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", numberOfChanges);
              if(numberOfChanges > 0)
              {
                  LinkDBChat.query().$promise.then(function(resp){
                      $scope.messages = resp;
                      console.log("Third response : ", response);
                      console.log("Third size : ", response.length);
                  });
                  //$scope.$parent.messages = LinkDBChat.query();
              }
            }
          //}
        });

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

      $scope.messages2 = LinkDBChat.query();
      var mySelf = $cookieStore.get('UserIdUser');
      //document.getElementById('backChatIcon').style.backgroundColor = 'white';
      //$scope.messages2 = LinkDBChat.query();
      
      refreshChatNotifications =
      $interval(function(){
        setTimeout(function(){

          var number = 0;
          for (var i = 0; i < $scope.messages2.length; i++)
          {
            if(($scope.messages2[i].idUser_Users == mySelf) && ($scope.messages2[i].readStatus == false))
            {
              number++;
            }
          }

          console.log("number : ", number);

          if(number > 0)
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
          else if(number == 0)
          {
            document.getElementById('backChatIcon').style.backgroundColor = 'white';
          }

          //$scope.messages2 = LinkDBChat.query();
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
