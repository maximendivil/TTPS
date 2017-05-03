angular.module('myapp.administracion')
.controller('AdministracionCtrl', function($scope, $state, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

 	$scope.cargarCarteleras();

	$scope.permisos = {
		value: "false"
	};

	$scope.cartelera = {};

	$scope.nuevaCartelara = false;

	$scope.crearCartelera = function() {
		console.log("Permisos: " + $scope.permisos.value  + ", Nombre: " + $scope.cartelera.nombre + " Fecha: " + new Date());
		CarteleraService.agregarCartelera($scope.cartelera.nombre, $scope.permisos.value)
	    .then(function(){
	      $scope.nuevaCartelera = false;
	      $scope.registroExitoso = 'La cartelera se agregó correctamente!';
	      $scope.cargarCarteleras();
	    })
	    .catch(function(){
	      $scope.registroExitoso = 'Ocurrió un error al dar de alta la cartelera';
	    });
	}
});
