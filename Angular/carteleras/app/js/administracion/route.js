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
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
