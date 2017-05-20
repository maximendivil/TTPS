angular.module('myapp.ABMpermisos')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMpermisos', {
		url:'/PermisosCartelera',
		views:{
			'main':{
				templateUrl: 'js/ABMpermisos/views/ABMpermisos.html',
				controller: 'ABMpermisosCtrl'
			}
		}
	})
	.state('AgregarPermisos', {
		url:'/AgregarPermisos',
		views:{
			'main':{
				templateUrl: 'js/ABMpermisos/views/AgregarPermisos.html',
				controller: 'AgregarPermisosCtrl'
			}
		},
		params:{
			cartelera: null
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
