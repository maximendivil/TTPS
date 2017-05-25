angular.module('myapp.ABMpublicaciones')
.controller('ABMpublicacionesCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, PublicacionService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.itemsPerPage = 10;
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
			if ($scope.usuario.rol == 1){
				CarteleraService.getCartelera($scope.selected)
				.then(function(response){
					  //$scope.anioActivo = id;
					$scope.publicaciones = response.data;
					console.log(response.data);
				});
			}
			else {
				CarteleraService.getPublicaciones($scope.selected, $scope.usuario.id)
				.then(function(response){
					$scope.publicaciones = response.data;
					console.log(response.data);
				});
			}
		}		
	};

	$scope.eliminarPublicacion = function(id) {
		PublicacionService.eliminarPublicacion(id)
	    .then(function(){
	      $scope.cargarPublicaciones();
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la publicacion');
	    });
	};

})
.controller('AltaPublicacionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, PublicacionService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.carteleraActual = $stateParams.selected; //guardo id de cartelera seleccionada para mostrar su nombre
	$scope.publicacionEdit = {};
	$scope.publicacionEdit.comentarios = {
		value: 1
	};
	$scope.cargarCartelera = function(){ //obtengo nombre de la cartelera segun el id obtenido enviado por parametro
		CarteleraService.getCarteleraPorId($scope.carteleraActual)
		.then(function(response){
			$scope.cartelera = response.data.nombre;
			console.log(response.data);
		});		
	};

	$scope.cargarCartelera();

	$scope.crearPublicacion = function() {
		var file = $scope.myFile;
		var nombre = '';
		if (file != undefined) {
			var extension = "." + file.name.split(".").pop();
      		nombre = $scope.usuario.id + "_" + Math.random() + extension;
      		PublicacionService.uploadFilePublicacion(file,$scope.usuario,nombre).then(function(response){});
		}
		PublicacionService.agregarPublicacion($scope.usuario.id, $scope.publicacionEdit.titulo, $scope.publicacionEdit.descripcion, $scope.publicacionEdit.comentarios.value, $scope.carteleraActual, nombre)
	    .then(function(){
	      console.log("Se creo la publicacion");
	      $state.go("ABMpublicaciones");
	    });
	}
})
.controller('EdicionPublicacionCtrl', function($scope, $state, $stateParams, CarteleraService, LoginService, PublicacionService, $rootScope){	
	
	$scope.publicacionEdit = $stateParams.publicacion;

	$scope.modificarPublicacion = function(){
        console.log($scope.publicacionEdit);
        PublicacionService.modificarPublicacion($scope.publicacionEdit.id, $scope.publicacionEdit.titulo, $scope.publicacionEdit.descripcion, $scope.publicacionEdit.aceptaComentarios, $scope.publicacionEdit.cartelera, $scope.publicacionEdit.multimedia, $scope.publicacionEdit.tieneArchivo)
        .then(function(response){
        	console.log('Publicacion modificada con éxito');
        	$state.go("ABMpublicaciones");	
        })
        .catch(function(){
          console.error('Error al modificar la publicacion');
        });
    }

})
.directive('fileModel',['$parse',function($parse){  
  return {  
      restrinct: 'A',
       link: function($scope, element, attrs){  
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;
        element.bind('change', function(){  
          $scope.$apply(function(){
            modelSetter($scope,element[0].files[0]);
          });  
        });  
       }  
  };  
}]);
