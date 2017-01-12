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
    $scope.idSender   = $cookieStore.get('UserIdUser');
    //console.log("1 ---- ", $scope.receiver);
    //console.log("2 ---- ", $scope.idReceiver);
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

              //console.log("response !!!!! ---- ", $scope.idReceiver);
              //console.log("response !!!!! ---- ", $scope.idSender);
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
                      //console.log("Third response : ", resp);
                      //console.log("Third size : ", resp.length);
                  });
                  //$scope.updateMessages();
              }

              /*LinkDBChat.query().$promise.then(function(response){
                  $scope.messages = response;
              });*/
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

      //$scope.messages = LinkDBChat.query();
      //$scope.messages = $scope.messages;
      var mySelf = $cookieStore.get('UserIdUser');
      //document.getElementById('backChatIcon').style.backgroundColor = 'white';
      //$scope.messages = LinkDBChat.query();
      
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

          //$scope.messages = LinkDBChat.query();
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
