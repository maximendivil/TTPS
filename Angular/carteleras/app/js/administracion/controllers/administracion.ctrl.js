angular.module('myapp.administracion')
.controller('AdministracionCtrl', function($scope, $state, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	}
	);

	$scope.nuevaCartelara = false;
});
