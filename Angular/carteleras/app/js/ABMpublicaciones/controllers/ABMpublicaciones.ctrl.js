angular.module('myapp.ABMpublicaciones')
.controller('ABMpublicacionesCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = function() {
		if ($scope.usuario.rol == 1) {
			CarteleraService.getCarteleras().then(function(response){
		  		$scope.carteleras = response.data;
			}, 
			function(response) {
		      console.log("algo anduvo mal");
		  	});
		}
		else {
			CarteleraService.getCartelerasHabilitadas($scope.usuario.id).then(function(response){
	  		$scope.carteleras = response.data;
			}, 
			function(response) {
	      		console.log("algo anduvo mal");
		  	});
		}		
 	};

	$scope.cargarCarteleras();

	$scope.cargarPublicaciones = function(){
		if ($scope.selected != ""){
			CarteleraService.getCartelera($scope.selected)
			.then(function(response){
				  //$scope.anioActivo = id;
				$scope.publicaciones = response.data;
				console.log(response.data);
			});
		}		
	};

});
