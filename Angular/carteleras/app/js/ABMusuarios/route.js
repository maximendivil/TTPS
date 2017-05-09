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
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
