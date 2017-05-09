angular.module('myapp.ABMpublicaciones')
.controller('ABMpublicacionesCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
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

	$scope.cargarPublicaciones = function(){
		CarteleraService.getCartelera($scope.selected)
		.then(function(response){
			  //$scope.anioActivo = id;
			$scope.cartelera = response.data;
			console.log(response.data);
		});
	};

});
