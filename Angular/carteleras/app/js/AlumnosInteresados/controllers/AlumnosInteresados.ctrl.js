angular.module('myapp.AlumnosInteresados')
.controller('AlumnosInteresadosCtrl', function($scope, $state, $stateParams, UsuarioService, CarteleraService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCartelerasHabilitadas = function() {
		CarteleraService.getCartelerasHabilitadas($scope.usuario.id).then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
      		console.log("algo anduvo mal");
	  	})
 	};

 	$scope.carteleraSeleccionada = null;

	$scope.cargarAlumnosInteresados = function() {
		if ($scope.carteleraSeleccionada != ""){
			UsuarioService.getAlumnosInteresados($scope.carteleraSeleccionada).then(function(response){
		  		$scope.alumnos = response.data;
			}, 
			function(response) {
		  		console.log("algo anduvo mal");
		  	});
		}		
 	};

 	$scope.cargarCartelerasHabilitadas();
});