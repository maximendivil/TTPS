angular.module('myapp.administracion')
.controller('AdministracionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.itemsPerPage = 5;
	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};
 	
	$scope.eliminarCartelera = function(id) {
		CarteleraService.eliminarCartelera(id)
	    .then(function(){
	      $scope.cargarCarteleras();
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}

	$scope.cargarCarteleras();	

})
.controller('EdicionCarteleraCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){
	$scope.carteleraEdit = $stateParams.cartelera;
	if ($scope.carteleraEdit == null) {
		$scope.carteleraEdit = angular.fromJson(localStorage.getItem('idCartelera'));
	}
	else {
		localStorage.setItem('idCartelera', angular.toJson($scope.carteleraEdit));
	}
	$scope.modificarCartelera = function() {
		CarteleraService.modificarCartelera($scope.carteleraEdit.id, $scope.carteleraEdit.nombre, $scope.carteleraEdit.publica)
	    .then(function(){
	      $state.go("ABMcarteleras");
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}
})
.controller('NuevaCarteleraCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){
	$scope.permisos = {
		value: 0
	};

	$scope.cartelera = {};

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
});
