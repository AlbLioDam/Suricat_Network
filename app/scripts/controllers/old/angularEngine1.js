var app = angular.module('MonApp');

app.controller('PostsCtrl', function($scope, LinkDB){
	$scope.users = LinkDB.query();
	console.log("ok post");
	$scope.user = LinkDB.get({id: 2}, function(){
		console.log($scope.user);
	});
});

