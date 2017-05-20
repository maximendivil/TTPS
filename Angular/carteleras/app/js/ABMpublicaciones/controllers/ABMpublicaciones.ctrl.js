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

})
.controller('AltaPublicacionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, PublicacionService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.carteleraActual = $stateParams.selected; //guardo id de cartelera seleccionada para mostrar su nombre

	$scope.cargarCartelera = function(){ //obtengo nombre de la cartelera segun el id obtenido enviado por parametro
		CarteleraService.getCarteleraPorId($scope.carteleraActual)
		.then(function(response){
			$scope.cartelera = response.data.nombre;
			console.log(response.data);
		});		
	};

	$scope.cargarCartelera();

	$scope.crearPublicacion = function() {
		PublicacionService.agregarPublicacion($scope.usuario.id, $scope.publicacionEdit.titulo, $scope.publicacionEdit.descripcion, $scope.publicacionEdit.comentarios, $scope.carteleraActual)
	    .then(function(){
	      console.log("Se creo la publicacion");
	      $state.go("ABMpublicaciones");
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al crear la publicacion');
	    });
	}
})
.controller('EdicionPublicacionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, $rootScope){	
	

});
