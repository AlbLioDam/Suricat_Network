var app = angular.module('MonApp', ['ngResource']);

app.factory('LinkDB', function($resource){
	//$resource('http://majesticneo.ddns.net:3000/user/:id.json');
	return $resource('http://10.111.61.81:3000/user/:id', null, {
		'update': {method:'PUT', params: {idUser: "@idUser"}},
		'get': {method:'GET', isArray: true}
	});
});

app.controller('PostsCtrl', function($scope, LinkDB){
	$scope.users = LinkDB.query();
	$scope.user = LinkDB.get({id: 2}, function(){
		console.log($scope.user);
	});
});
