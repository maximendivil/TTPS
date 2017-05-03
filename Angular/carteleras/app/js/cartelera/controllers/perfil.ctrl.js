angular.module('myapp.perfil')
.controller('PerfilCtrl', function($scope, $state, PerfilService){

	$scope.modificarUsuario = function(usuario){
        console.log($scope.usuario);
        PerfilService.modificarUsuario($scope.usuario)
        .then(function(response){
        	console.log('Usuario modificado con éxito');	
        })
        .catch(function(){
          console.error('Error al modificar el usuario');
        });
    }
    $scope.modificarPassword = function(password){
        console.log($scope.usuario);
        $scope.usuario.password = password;
        PerfilService.modificarUsuario($scope.usuario)
        .then(function(response){
            console.log('Usuario modificado con éxito');    
        })
        .catch(function(){
          console.error('Error al modificar el usuario');
        });
    }
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
    $scope.usuario.fechaNacimiento = new Date($scope.usuario.fechaNacimiento);
    console.log($scope.usuario);
    $scope.user = {};
	$scope.rol = angular.fromJson(localStorage.getItem('rol'));
});



