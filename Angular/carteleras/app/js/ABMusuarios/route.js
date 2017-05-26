angular.module('myapp.ABMusuarios')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMusuarios', {
		url:'/ABMusuarios',
		views:{
			'main':{
				templateUrl: 'js/ABMusuarios/views/ABMusuarios.html',
				controller: 'ABMusuariosCtrl'
			}
		},
		params:{
			exito: null
		}
	})
	.state('AltaUsuarios', {
		url:'/AltaUsuarios',
		views:{
			'main':{
				templateUrl: 'js/ABMusuarios/views/AltaUsuarios.html',
				controller: 'AltaUsuariosCtrl'
			}
		}
	})
	.state('EdicionUsuarios', {
		url:'/EdicionUsuarios',
		views:{
			'main':{
				templateUrl: 'js/ABMusuarios/views/EdicionUsuarios.html',
				controller: 'EdicionUsuariosCtrl'
			}
		},
		params:{
			usuario: null
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
