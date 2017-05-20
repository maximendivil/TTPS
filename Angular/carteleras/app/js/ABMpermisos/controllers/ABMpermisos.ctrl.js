angular.module('myapp.ABMpermisos')
.controller('ABMpermisosCtrl', function($scope, $state, $stateParams, UsuarioService, CarteleraService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarCarteleras = function() {
		CarteleraService.getCarteleras().then(function(response){
	  		$scope.carteleras = response.data;
		}, 
		function(response) {
      		console.log("algo anduvo mal");
	  	})
 	};

 	$scope.cargarUsuariosHabilitados = function(){
 		if ($scope.carteleraSeleccionada != "") {
 			UsuarioService.getPublicadoresHabilitados($scope.carteleraSeleccionada).then(function(response){
	 			$scope.usuarios = response.data;
	 			console.log($scope.usuarios);
	 		},
	 		function(response){
				console.log("algo anduvo mal");
	 		});
 		} 		
 	};

 	$scope.carteleraSeleccionada = null;

 	$scope.quitarPermisos = function(publicador){
 		UsuarioService.quitarPermisos(publicador, $scope.carteleraSeleccionada).then(function(response){
 			console.log("Se quitó el permiso correctamente");
 			$scope.cargarUsuariosHabilitados();
 		},
 		function(response) {
 			console.log("algo anduvo mal");
 		})
 	};

 	$scope.cargarCarteleras();
	//$scope.cargarIntereses();
})
.controller('AgregarPermisosCtrl', function($scope, $state, $stateParams, UsuarioService, CarteleraService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.idCartelera = $stateParams.cartelera;

	$scope.cargarCartelera = function(idCartelera) {
		CarteleraService.getCarteleraPorId(idCartelera).then(function(response){
	  		$scope.cartelera = response.data;
		}, 
		function(response) {
      		console.log("algo anduvo mal");
	  	})
 	};

 	$scope.cargarCartelera($scope.idCartelera);

 	$scope.cargarPublicadoresSinPermiso = function(idCartelera){
		UsuarioService.getPublicadoresSinPermiso(idCartelera).then(function(response){
 			$scope.usuarios = response.data;
 			console.log($scope.usuarios);
 		},
 		function(response){
			console.log("algo anduvo mal");
 		});
 	};

	$scope.darPermisos = function(publicador) {
		UsuarioService.darPermisos(publicador,$scope.idCartelera).then(function(response){
			console.log("Se agregó el permiso correctamente");
	  		$scope.cargarPublicadoresSinPermiso($scope.idCartelera);
		}, 
		function(response) {
	  		console.log("algo anduvo mal");
	  	});
 	};

 	$scope.cargarPublicadoresSinPermiso($scope.idCartelera);
});