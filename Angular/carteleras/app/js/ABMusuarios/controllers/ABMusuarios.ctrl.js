angular.module('myapp.ABMusuarios')
.controller('ABMusuariosCtrl', function($scope, $state, $stateParams, UsuarioService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarUsuarios = function() {
		UsuarioService.getAdministradores().then(function(response){
	  		$scope.usuarios = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

	$scope.cargarUsuarios();

	$scope.eliminarAdministrador = function(id) {
		UsuarioService.eliminarUsuario(id)
	    .then(function(){
	      $scope.cargarUsuarios();
	    })
	    .catch(function(){
	      console.log('Ocurrió un error al eliminar la cartelera');
	    });
	}
})
.controller('AltaUsuariosCtrl', function($scope, $state, $stateParams, UsuarioService, LoginService, $rootScope){	
	$scope.usuario = {};
	$scope.roles = {
	    availableOptions: [
	      {id: '1', name: 'Administrador'},
	      {id: '2', name: 'Profesor'},
	      {id: '3', name: 'Alumno'},
	      {id: '4', name: 'Publicador'}
	    ],
	    rol: {id: '4', name: 'Publicador'} //This sets the default value of the select in the ui
    };
	$scope.agregarUsuario = function() {
		$scope.usuario.rol = 1;
		LoginService.crearUsuario($scope.usuario)
	    .then(function(){
	      console.log("Se registró al usuario");
	      $state.go("ABMusuarios");
	    })
	    .catch(function(){
	      console.log("Algo salió mal");
	    });
	};
})
.controller('EdicionUsuariosCtrl', function($scope, $state, $stateParams, UsuarioService, PerfilService, $rootScope){
	$scope.usuario = $stateParams.usuario;
	$scope.usuario.fechaNacimiento = new Date($scope.usuario.fechaNacimiento);
	$scope.modificarAdministrador = function(){
        console.log($scope.usuario);
        PerfilService.modificarUsuario($scope.usuario)
        .then(function(response){
        	console.log('Usuario modificado con éxito');
        	$state.go("ABMusuarios");	
        })
        .catch(function(){
          console.error('Error al modificar el usuario');
        });
    }
});