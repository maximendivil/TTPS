angular.module('myapp.administracion')
.controller('AdministracionCtrl', function($scope, $state, CarteleraService, LoginService, $rootScope){

	/*var  imagenRandom = function () {
		var height = ~~(Math.random() * 500) + 100;
		var id = ~~(Math.random() * 10000);
		return 'http://lorempixel.com/g/280/' + height + '/?' + id;
	};

	$scope.cargarPublicaciones = function(id,nombre){
		$scope.carteleraActual = nombre;
		CarteleraService.getCartelera(id)
		.then(function(response){
			  //$scope.anioActivo = id;
			$scope.cartelera = response.data;
			console.log(response.data);
		});
	};

	$scope.perfilAdministrador = function() {
		$state.go('administracion');
	}

	$scope.logout = function() {
		LoginService.logout()
		.then(function(){
			$state.go('login');
		});
	};

	$scope.obtenerTodas = function() {
		CarteleraService.getTodasPublicaciones()
		.then(function(response){
			  //$scope.anioActivo = id;
			$scope.cartelera = response.data;
			console.log(response.data);
		});
	};

	$scope.cargarCarteleras = CarteleraService.getCarteleras().then(function(response){
	  	$scope.carteleras = response.data;
	}, 
	function(response) {
      console.log("algo anduvo mal");
  	}
	);
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	/*$scope.anioActivo = 'primero';
  	$scope.cargarPublicaciones(1,"Ingresantes");*/

});
