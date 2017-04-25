angular.module('myapp.perfil')
.controller('PerfilCtrl', function($scope, $state, PerfilService){

	$scope.modificarUsuario = function(usuario){
        PerfilService.modificarUsuario(usuario)
        .then(function(response){
        	console.log('Usuario modificado con éxito');	
        })
        .catch(function(){
          console.error('Error al modificar el usuario');
        });
    }



	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.rol = angular.fromJson(localStorage.getItem('rol'));
});



