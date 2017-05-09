angular.module('myapp.ABMusuarios')
.controller('ABMusuariosCtrl', function($scope, $state, $stateParams, UsuarioService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarUsuarios = function() {
		UsuarioService.getUsuarios().then(function(response){
	  		$scope.usuarios = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

	$scope.cargarUsuarios();
});
