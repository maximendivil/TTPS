angular.module('myapp.administracion')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMcarteleras', {
		url:'/ABMcarteleras',
		views:{
			'main':{
				templateUrl: 'js/ABMcarteleras/views/ABMCartelera.html',
				controller: 'AdministracionCtrl'
			}
		},
		params:{
			exito: null
		}
	})
	.state('nuevaCartelera', {
		url:'/nuevaCartelera',
		views:{
			'main':{
				templateUrl: 'js/ABMcarteleras/views/nuevaCartelera.html',
				controller: 'NuevaCarteleraCtrl'
			}
		}
	})
	.state('editarCartelera', {
		url:'/editarCartelera',
		views:{
			'main':{
				templateUrl: 'js/ABMcarteleras/views/editarCartelera.html',
				controller: 'EdicionCarteleraCtrl'
			}
		},
		params:{
			cartelera: null
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
