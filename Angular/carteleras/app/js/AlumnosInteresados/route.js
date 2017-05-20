angular.module('myapp.AlumnosInteresados')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('AlumnosInteresados', {
		url:'/AlumnosInteresados',
		views:{
			'main':{
				templateUrl: 'js/AlumnosInteresados/views/AlumnosInteresados.html',
				controller: 'AlumnosInteresadosCtrl'
			}
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
