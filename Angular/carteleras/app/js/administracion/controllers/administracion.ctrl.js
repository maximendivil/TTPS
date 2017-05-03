angular.module('myapp.administracion')
.controller('AdministracionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

 	$scope.perfilAdministrador = function() {
		$state.go('administracion');
	}

 	$scope.cargarCarteleras();

	$scope.permisos = {
		value: 0
	};

	$scope.cartelera = {};

	$scope.nuevaCartelara = false;
	$scope.editaCartelera = false;
	$scope.carteleraEdit = $stateParams.cartelera;

	$scope.crearCartelera = function() {
		CarteleraService.agregarCartelera($scope.cartelera.nombre, $scope.permisos.value)
	    .then(function(){
	      $scope.nuevaCartelera = false;
	      $scope.cargarCarteleras();
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}

	$scope.modificarCartelera = function() {
		CarteleraService.modificarCartelera($scope.carteleraEdit.id, $scope.carteleraEdit.nombre, $scope.carteleraEdit.publica)
	    .then(function(){
	      $state.go("administracion");
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}

	$scope.eliminarCartelera = function(id) {
		CarteleraService.eliminarCartelera(id)
	    .then(function(){
	      $scope.cargarCarteleras();
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}
});
