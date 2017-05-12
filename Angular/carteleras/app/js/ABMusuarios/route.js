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
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
