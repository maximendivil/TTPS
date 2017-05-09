angular.module('myapp.ABMpublicaciones')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('ABMpublicaciones', {
		url:'/ABMpublicaciones',
		views:{
			'main':{
				templateUrl: 'js/ABMpublicaciones/views/ABMpublicaciones.html',
				controller: 'ABMPublicacionesCtrl'
			}
		}
	});
}]);
