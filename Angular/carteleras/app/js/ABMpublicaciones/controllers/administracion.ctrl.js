angular.module('myapp.ABMpublicaciones')
.controller('ABMPublicacionesCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

 	$scope.ABMcarteleras = function() {
		$state.go('ABMcarteleras');
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

	$scope.cargarCarteleras();	

});
