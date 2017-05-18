angular.module('myapp.Intereses')	
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('Intereses', {
		url:'/Intereses',
		views:{
			'main':{
				templateUrl: 'js/intereses/views/Intereses.html',
				controller: 'InteresesCtrl'
			}
		}
	});
	

	//$urlRouterProvider.otherwise('/cartelera');
}]);
