/*-- CONNEXION MODULE TO THE DATABASE THROUGH THE NODEJS REST SERVER --*/

var app = angular.module('Suricat', ['ngResource']);

//app.constant('BaseURL', 'http://majesticneo.ddns.net:3000/');
app.constant('BaseURL', 'http://10.111.61.81:3000');
app.constant('ConnexionUsers', '/user/:id');
app.constant('CheckLogin', '/user/login');
app.constant('Kanban', '/todo/:id');
app.constant('Department', '/department/:id')

// Connexion to users's datas
app.factory('LinkDB', function($resource, BaseURL, ConnexionUsers){
	return $resource(BaseURL + ConnexionUsers, null, {
		'update': {method:'PUT', params: {idUser: "@idUser"}},
	});
});


// Connexion to check login validity
app.factory('LinkDBCheckLogin', function($resource, BaseURL, CheckLogin){
	return $resource(BaseURL + CheckLogin, null, {
		'update': {method:'PUT', params: {idUser: "@idUser"}},
		'check': {method: 'POST'}
	});
});

// Connexion to messages's datas
app.factory('LinkDBChat', function($resource, BaseURL, Chat){
	return $resource(BaseURL + Chat, null, {
		//'update': {method:'PUT', params: {idMessage: "@idMessage"}}
	});
});

// Connexion to Tasks's datas
app.factory('LinkDBKanbanTasks', function($resource, BaseURL, Kanban){
	return $resource(BaseURL + Kanban, null, {
		//'update': {method:'PUT', params: {idMessage: "@idMessage"}}
	});
});

// Connexion to Tasks's datas
app.factory('LinkDBDepartment', function($resource, BaseURL, Department){
	return $resource(BaseURL + Department, null, {
		//'update': {method:'PUT', params: {idMessage: "@idMessage"}}
	});
});