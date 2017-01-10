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
  ]);

app.controller('RefreshOverTime',['$scope', '$interval', 'LinkDBChat', function($scope, $interval, LinkDBChat)
{
  var refreshChat;
  var refreshChatNotifications;

  // START REFRESH OF CHAT
  $scope.startRefreshChat = function()
  {
      $scope.messages = {};
      if(angular.isDefined(refreshChat)) return;
      refreshChat =
      $interval(function()
      {
          if($scope.receiver != "")
          {
            console.log("taille : ", $scope.messages.length);
            for (var i = 0; i < $scope.messages.length; i++)
            {
              if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
              {
                // Change status of messages to already read
                LinkDBChat.updateReadStatus({idMessage : $scope.messages[i].idMessage});
              }
            }
          }
          //$scope.messages = LinkDBChat.query();
          LinkDBChat.query().$promise.then(function(response){
            console.log("response", response.length);
            console.log("messages", $scope.messages.length);
            if($scope.receiver != "")
            {
              $scope.FiltredResponse = [{}];
              for (var i = 0; i < response.length; i++)
              {
                if((response[i].idUser == $scope.idReceiver) && (response[i].idUser_Users == $scope.idSender) && (response[i].readStatus == false))
                {
                  $scope.FiltredResponse.push(response[i]);
                  //console.log($scope.FiltredResponse);
                }
              }

              $scope.FiltredMessages = [{}];
              for (var i = 0; i < $scope.messages.length; i++) 
              {
                if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
                {
                  $scope.FiltredMessages.push($scope.messages[i]);
                  //console.log($scope.FiltredMessages);
                }
              }
              
              $scope.messages = response;
            }
        });
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
      console.log("ici");
      if(angular.isDefined(refreshChatNotifications)) return;
      console.log("ici 2");
      document.getElementById('backChatIcon').style.backgroundColor = 'white';
      $scope.messages = LinkDBChat.query();
      
      refreshChatNotifications =
      $interval(function(){
        setTimeout(function(){
          var number = 0;
          var mySelf = $scope.idUser;
          console.log("ici 3");
          for (var i = 0; i < $scope.messages.length; i++)
          {
            if(($scope.messages[i].idUser_Users == mySelf) && ($scope.messages[i].readStatus == false))
            {
              number++;
            }
          }

          console.log("number : ", number);

          if(number != 0)
          {
            if(document.getElementById('backChatIcon').style.backgroundColor == 'white')
            {
              document.getElementById('backChatIcon').style.backgroundColor = 'red';
            }
            else
            {
              document.getElementById('backChatIcon').style.backgroundColor = 'white';
            }
          }/*
          else
          {
            document.getElementById('backChatIcon').style.backgroundColor = 'white';
          }*/

          $scope.messages = LinkDBChat.query();
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
