angular.module('myapp.ABMpublicaciones')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMpublicaciones', {
		url:'/ABMpublicaciones',
		views:{
			'main':{
				templateUrl: 'js/ABMpublicaciones/views/ABMpublicaciones.html',
				controller: 'ABMpublicacionesCtrl'
			}
		}
	})
	.state('AltaPublicacion', {
		url:'/AltaPublicacion',
		views:{
			'main':{
				templateUrl: 'js/ABMpublicaciones/views/AltaPublicacion.html',
				controller: 'AltaPublicacionCtrl'
			}
		},
		params:{
			selected: null
		}
	})
	.state('EdicionPublicacion', {
		url:'/EdicionPublicacion',
		views:{
			'main':{
				templateUrl: 'js/ABMpublicaciones/views/EdicionPublicacion.html',
				controller: 'EdicionPublicacionCtrl'
			}
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
