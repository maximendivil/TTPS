angular.module('myapp.Intereses')
.controller('InteresesCtrl', function($scope, $state, $stateParams, UsuarioService, CarteleraService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.itemsPerPage = 10;
	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
      		console.log("algo anduvo mal");
	  	})
 	};

	$scope.cargarIntereses = function() {
		UsuarioService.getIntereses($scope.usuario.id).then(function(response){
	  		$scope.intereses = response.data;
	  		console.log($scope.intereses);
		}, 
		function(response) {
	  		console.log("algo anduvo mal");
	  	})
 	};

 	$scope.agregarInteres = function(idCartelera){
 		UsuarioService.agregarInteres($scope.usuario, idCartelera).then(function(response){
 			$scope.cargarCarteleras();
 			$scope.cargarIntereses();
 			console.log("Se agregó el interes");
 		},
 		function(response) {
 			console.log("algo anduvo mal");
 		})
 	};

 	$scope.quitarInteres = function(idCartelera){
 		UsuarioService.quitarInteres($scope.usuario, idCartelera).then(function(response){
 			$scope.cargarCarteleras();
 			$scope.cargarIntereses();
 			console.log("Se quitó el interes");
 		},
 		function(response) {
 			console.log("algo anduvo mal");
 		})
 	};

 	$scope.cargarCarteleras();
	$scope.cargarIntereses();
});