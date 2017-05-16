angular.module('myapp.administracion')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMcarteleras', {
		url:'/ABMcarteleras',
		views:{
			'main':{
				templateUrl: 'js/administracion/views/ABMCartelera.html',
				controller: 'AdministracionCtrl'
			}
		}
	})
	.state('nuevaCartelera', {
		url:'/nuevaCartelera',
		views:{
			'main':{
				templateUrl: 'js/administracion/views/nuevaCartelera.html',
				controller: 'NuevaCarteleraCtrl'
			}
		}
	})
	.state('editarCartelera', {
		url:'/editarCartelera',
		views:{
			'main':{
				templateUrl: 'js/administracion/views/editarCartelera.html',
				controller: 'EdicionCarteleraCtrl'
			}
		},
		params:{
			cartelera: null
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
