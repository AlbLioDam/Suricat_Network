/*-- CONNEXION MODULE TO THE DATABASE THROUGH THE NODEJS REST SERVER --*/

var app = angular.module('Suricat');

//app.constant('BaseURL', 'http://majesticneo.ddns.net:3000/');
//app.constant('BaseURL', 'http://10.111.61.81:3000');
app.constant('BaseURL', 'http://localhost:3000');
app.constant('ConnexionUsers', '/user/:idUser');
app.constant('CheckLogin', '/user/login');
app.constant('Kanban', '/todo/:idTask/:idTeam');
app.constant('Department', '/department/:idDepartment');
app.constant('Teams', '/team');
app.constant('BelongTo', '/belongto');
app.constant('BelongToIdUser', '/belongto/getAllTeamsById/:idUser');
app.constant('BelongToRemove', '/belongto/remove');
app.constant('BelongToByTeam', '/belongto/usersinteam/:idTeam');
app.constant('NotBelongToByTeam', '/belongto/usersnotinteam/:idTeam');
app.constant('TeamActualities', '/teamActuality/:idActuality');
app.constant('CorporateActualities', '/corporatelifeactuality/:idActuality');
app.constant('WorkCouncilActualities', '/workcouncilactuality/:idActuality');
app.constant('LeisureActualities', '/leisureActuality/:idActuality');
app.constant('Actuality', '/actuality/:idActuality');
app.constant('Actualities', '/actuality');
app.constant('Task', '/task');
app.constant('Chat', '/message/:idMessage');
app.constant('AttributeTaskToUser', '/have/:idTask/:idTeam/:idUser');
app.constant('ChangeTaskToUser', '/have/update');



app.factory('LinkDBChangeTaskToUser', function($resource,BaseURL, ChangeTaskToUser)
{
   return $resource(BaseURL + ChangeTaskToUser, null, {
       'update': {method: 'PUT'}
   }); 
});

// Connexion to have datas
app.factory('LinkDBAttributeTaskUser', function ($resource, BaseURL, AttributeTaskToUser)
{
    return $resource(BaseURL + AttributeTaskToUser, null, {
        'removeUserFromTask': {method: 'DELETE', params:{idTask:"@idTask", idTeam:"@idTeam", idUser:"@idUser"}},
        'update': {method: 'PUT' , params:{idTask:"@idTask"}}
    });
});

// Connexion to users's datas
app.factory('LinkDB', function ($resource, BaseURL, ConnexionUsers)
{
    return $resource(BaseURL + ConnexionUsers, null, {
        'update': {method: 'PUT'},
        'updateUser': {method: 'PUT'},
        'getUserById': {method: 'GET', params: {idUser: "@idUser"}}
    });
});

// Connexion to task's datas
app.factory('LinkDBTask', function ($resource, BaseURL, Task)
{
    return $resource(BaseURL + Task, null, {
        'post': {method: 'POST'},
        //'updtateTask' : {method :'PUT'},
        'update': {method:'PUT', params: {idTask: "@idTask"}}
    });
});

// Connexion to check login validity
app.factory('LinkDBCheckLogin', function ($resource, BaseURL, CheckLogin) {
    return $resource(BaseURL + CheckLogin, null, {
        'update': {method: 'PUT', params: {idUser: "@idUser"}},
        'check': {method: 'POST'}
    });
});

// Connexion to messages's datas
app.factory('LinkDBChat', function($resource, BaseURL, Chat){
	return $resource(BaseURL + Chat, null, {
		'updateReadStatus': {method:'PUT', params: {idMessage: "@idMessage"}}
	});
});

// Connexion to Tasks's datas
app.factory('LinkDBKanbanTasks', function ($resource, BaseURL, Kanban) {
    return $resource(BaseURL + Kanban, null, {
        'removeTaskFromTeam': {method: 'DELETE', params: {idTask: "@idTask", idTeam: "@idTeam"}},
        'update' : {method:'PUT'}
    });
});

// Connexion to Department's datas
app.factory('LinkDBDepartment', function ($resource, BaseURL, Department) {
    return $resource(BaseURL + Department, null, {
    });
});

// Connexion to get teams 
app.factory('LinkDBTeams', function ($resource, BaseURL, Teams) {
    return $resource(BaseURL + Teams, null, {
        'update': {method: 'PUT'}
    });
});

// Connexion to BelongTo's datas
app.factory('LinkDBBelongTo', function ($resource, BaseURL, BelongTo) {
    return $resource(BaseURL + BelongTo, null, {
        'removeUser': {method: 'DELETE', params: {idUser: "@idUser", idTeam: "@idTeam"}},
        'save': {method: 'POST', params: {idUser: "@idUser", idTeam: "@idTeam"}}
        //'removeUser': {method:'DELETE'	, params: {idUser: "@idUser", idTeam: "@idTeam"}}
    });
});

// Connexion to BelongTo's datas for remove
app.factory('LinkDBBelongToRemove', function ($resource, BaseURL, BelongToRemove) {
    return $resource(BaseURL + BelongToRemove, null, {
        'removeUser': {method: 'POST', params: {idUser: "@idUser", idTeam: "@idTeam"}}
    });
})

// Connexion to BelongTo's datas
app.factory('LinkDBBelongToByUser', function ($resource, BaseURL, BelongToIdUser) {
    return $resource(BaseURL + BelongToIdUser, null, {
        'removeUser': {method: 'DELETE', params: {idUser: "@idUser", idTeam: "@idTeam"}},
        'save': {method: 'POST', params: {idUser: "@idUser", idTeam: "@idTeam"}},
        'getTeamsOfUser': {method: 'GET', params: {idUser: "@idUser"}, isArray: true}
        //'removeUser': {method:'DELETE'	, params: {idUser: "@idUser", idTeam: "@idTeam"}}
    });
});

// Connexion to BelongTo's datas for remove
app.factory('LinkDBBelongToRemove', function ($resource, BaseURL, BelongToRemove) {
    return $resource(BaseURL + BelongToRemove, null, {
        'removeUser': {method: 'POST', params: {idUser: "@idUser", idTeam: "@idTeam"}}
    });
});

// Connexion to BelongTo's datas
app.factory('LinkDBBelongToByTeam', function ($resource, BaseURL, BelongToByTeam) {
    return $resource(BaseURL + BelongToByTeam, null, {
        'getUsersInTeam': {method: 'GET', params: {idTeam: "@idTeam"}, isArray: true}
    });
});

// Connexion to BelongTo's datas
app.factory('LinkDBNotBelongToByTeam', function ($resource, BaseURL, NotBelongToByTeam) {
    return $resource(BaseURL + NotBelongToByTeam, null, {
        'getUsersNotInTeam': {method: 'GET', params: {idTeam: "@idTeam"}, isArray: true}
    });
});

// Connexion to get teamsActualities 
app.factory('LinkDBTeamActualities', function ($resource, BaseURL, TeamActualities) {
    return $resource(BaseURL + TeamActualities, null, {
        'post': {method: 'POST'},
        'remove': {method: 'DELETE', params: {idActuality: "@idActuality"}}
    });
});

// Connexion to Actualities datas
app.factory('LinkDBActualities', function ($resource, BaseURL, Actualities) {
    return $resource(BaseURL + Actualities, null, {
        //'update':{method:'PUT',params:{idActuality:"@idActuality"}}
        'remove': {method: 'DELETE', params: {idActuality: "@idActuality"}}
    });
});

// Connexion to Actuality datas by id
app.factory('LinkDBActualityId', function ($resource, BaseURL, Actuality) {
    return $resource(BaseURL + Actuality, null, {
        'update': {method: 'PUT', params: {idActuality: "@idActuality"}}
    });
});

// Connexion to Corporate Actuality datas
app.factory('LinkDBCorpActualities', function ($resource, BaseURL, CorporateActualities) {
    return $resource(BaseURL + CorporateActualities, null, {
        //'update':{method:'PUT',params:{idActuality:"@idActuality"}}
        'post': {method: 'POST'},
        'remove': {method: 'DELETE', params: {idActuality: "@idActuality"}}
    });
});

// Connexion to Corporate Actuality datas
app.factory('LinkDBWorkCouncilActualities', function ($resource, BaseURL, WorkCouncilActualities) {
    return $resource(BaseURL + WorkCouncilActualities, null, {
        //'update':{method:'PUT',params:{idActuality:"@idActuality"}}
        'post': {method: 'POST'},
        'remove': {method: 'DELETE', params: {idActuality: "@idActuality"}}
    });
});

// Connexion to Corporate Actuality datas
app.factory('LinkDBLeisureActualities', function ($resource, BaseURL, LeisureActualities) {
    return $resource(BaseURL + LeisureActualities, null, {
        //'update':{method:'PUT',params:{idActuality:"@idActuality"}}
        'post': {method: 'POST'},
        'remove': {method: 'DELETE', params: {idActuality: "@idActuality"}}
    });
});
