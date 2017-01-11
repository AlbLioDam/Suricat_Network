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
  $scope.messages = {};

  $scope.fill = function(receiver, idReceiver)
  {
    $scope.receiver   = receiver;
    $scope.idReceiver = idReceiver;
    console.log("1 ---- ", $scope.receiver);
    console.log("2 ---- ", $scope.idReceiver);
  }

  $scope.updateMessages = function()
  {
    $scope.messages = LinkDBChat.query();
    return $scope.messages;
  }

  // START REFRESH OF CHAT
  $scope.startRefreshChat = function()
  {
      if(angular.isDefined(refreshChat)) return;

/*      LinkDBChat.query().$promise.then(function(response){
          $scope.messages  = response;
          //console.log("full : ",$scope.messages);
          //console.log("full Taille : ",$scope.messages.length);
      });*/
     
      refreshChat =
      $interval(function(){
        setTimeout(function(){
          LinkDBChat.query().$promise.then(function(response){

            if($scope.receiver != "")
            {
              /*              
              $scope.FiltredResponse = [{}];
              for (var i = 0; i < response.length; i++)
              {
                if((response[i].idUser == $scope.idReceiver) && (response[i].idUser_Users == $scope.idSender) && (response[i].readStatus == false))
                {
                  $scope.FiltredResponse.push(response[i]);
                  console.log($scope.FiltredResponse.length);
                }
              }

              $scope.FiltredMessages = [{}];
              for (var i = 0; i < $scope.messages.length; i++) 
              {
                if(($scope.messages[i].idUser == $scope.idReceiver) && ($scope.messages[i].idUser_Users == $scope.idSender) && ($scope.messages[i].readStatus == false))
                {
                  $scope.FiltredMessages.push($scope.messages[i]);
                  console.log($scope.FiltredMessages.length);
                }
              }*/
              console.log("3 ---- ", $scope.receiver);
              console.log("4 ---- ", $scope.idReceiver);

              var numberOfChanges = 0;
              for (var i = 0; i < response.length; i++)
              {
                if((response[i].idUser == $scope.idReceiver) && (response[i].idUser_Users == $scope.idSender) && (response[i].readStatus == false))
                {
                    console.log("5 --------- A METTRE EN LU");
                    LinkDBChat.updateReadStatus({idMessage: response[i].idMessage});
                    numberOfChanges++;
                }
              }

              if(numberOfChanges > 0)
              {
                  $scope.messages = LinkDBChat.query();
              }
            }

            // Update of the scope messages if there is more messages in the db
            //$scope.result = angular.equals($scope.messages, response);
            //console.log($scope.result);
            //if($scope.result == false)
            //{
              //$scope.messages = response;
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

      $scope.messages = LinkDBChat.query();
      var mySelf = $cookieStore.get('UserIdUser');
      //document.getElementById('backChatIcon').style.backgroundColor = 'white';
      //$scope.messages = LinkDBChat.query();
      
      refreshChatNotifications =
      $interval(function(){
        setTimeout(function(){
          var number = 0;

          for (var i = 0; i < $scope.messages.length; i++)
          {
            if(($scope.messages[i].idUser_Users == mySelf) && ($scope.messages[i].readStatus == false))
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
