angular.module('myapp.perfil')
.controller('PerfilCtrl', function($scope, $state, PerfilService, UsuarioService, $http){

    $scope.uploadFile = function(){
      var file = $scope.myFile;      
      var extension = "." + file.name.split(".").pop();
      var nombre = $scope.usuario.id + "_" + Math.random() + extension;
      PerfilService.uploadFileToUrl(file,$scope.usuario,nombre)
      .then(function(response){
        $scope.usuario.nombreArchivo = nombre;
        PerfilService.agregarFoto($scope.usuario).then(function(response){
          console.log("La foto se agregó correctamente");
          //Se actualiza el usuario en el almacenamiento local
          $scope.usuario.tieneFoto = 1;
          $scope.usuario.nombreArchivo = nombre;
          localStorage.setItem('usuario', angular.toJson($scope.usuario));
          $state.go("perfil");
        });
      })
      .catch(function(){
        console.log("Error");
      });
    }
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
        console.log($scope.passNuevo1);
        console.log($scope.passNuevo2);
        if ($scope.usuario.password == $scope.passActual) {
          $scope.usuario.password = password;        
          PerfilService.modificarUsuario($scope.usuario)
          .then(function(response){
              console.log('Usuario modificado con éxito');    
          })
          .catch(function(){
            console.error('Error al modificar el usuario');
          });
        }
        else {
          // Habría que usar un alert para notificar.
          $scope.errorPassword = "Password actual incorrecto."
        }
    }
	$scope.usuario = angular.fromJson(localStorage.getItem('usuario'));
  $scope.usuario.fechaNacimiento = new Date($scope.usuario.fechaNacimiento);
  console.log($scope.usuario);
  $scope.user = {};
	$scope.rol = angular.fromJson(localStorage.getItem('rol'));
})
.directive('pwCheck', function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
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



