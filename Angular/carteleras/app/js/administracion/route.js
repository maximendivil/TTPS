angular.module('myapp.administracion')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('administracion', {
		url:'/administracion',
		views:{
			'main':{
				templateUrl: 'js/administracion/views/ABMCartelera.html',
				controller: 'AdministracionCtrl'
			}
		}
	})
	.state('editarCartelera', {
		url:'/editarCartelera',
		views:{
			'main':{
				templateUrl: 'js/administracion/views/editarCartelera.html',
				controller: 'AdministracionCtrl'
			}
		},
		params:{
			cartelera: null
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
