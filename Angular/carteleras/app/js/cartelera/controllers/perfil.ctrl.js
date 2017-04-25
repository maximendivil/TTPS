angular.module('myapp.perfil')
.controller('PerfilCtrl', function ($scope, $state, PerfilService, Response, errResponse) {

	function modificarUsuario(usuario){
        PerfilService.modificarUsuario(usuario)
            .then(
            function(Response){
            	console.log('Usuario modificado con éxito');	
            },
            function(errResponse){
                console.error('Error al modificar el usuario');
            }
        );
    };



	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
	$scope.rol = angular.fromJson(localStorage.getItem('rol'));
})



