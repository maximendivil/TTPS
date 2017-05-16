angular.module('myapp.ABMusuarios')
.controller('ABMusuariosCtrl', function($scope, $state, $stateParams, UsuarioService, $rootScope){	
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

	$scope.cargarUsuarios = function() {
		UsuarioService.getUsuarios().then(function(response){
	  		$scope.usuarios = response.data;
		}, 
		function(response) {
	      console.log("algo anduvo mal");
	  	})
 	};

	$scope.cargarUsuarios();
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
.controller('EdicionUsuariosCtrl', function($scope, $state, $stateParams, UsuarioService, LoginService, $rootScope){
	$scope.usuario = $stateParams.usuario;
	$scope.usuario.fechaNacimiento = new Date($scope.usuario.fechaNacimiento);
	$scope.roles = {
	    availableOptions: [
	      {id: '1', name: 'Administrador'},
	      {id: '2', name: 'Profesor'},
	      {id: '3', name: 'Alumno'},
	      {id: '4', name: 'Publicador'}
	    ],
	    rol: {id: $scope.usuario.rol } //This sets the default value of the select in the ui
    };
	$scope.modificarPermisos = function(){
        console.log($scope.usuario);
        $scope.usuario.rol = $scope.roles.rol.id;
        UsuarioService.modificarPermisos($scope.usuario)
        .then(function(response){
        	console.log('Usuario modificado con éxito');
        	$state.go("ABMusuarios");	
        })
        .catch(function(){
          console.error('Error al modificar el usuario');
        });
    }
});