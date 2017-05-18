angular.module('myapp.perfil')
.controller('PerfilCtrl', function($scope, $state, PerfilService, UsuarioService, $http){

    $scope.uploadFiles = function () {
        var formdata = new FormData();
        angular.forEach($scope.files, function (file) {
            console.log(file + 'foreach');
            formdata.append('file', file);
        });
        $http.post('upload.php', formdata,
        {
          transformRequest:angular.identity,
          headers: {'Content-Type': undefined, 'Process-Data': false}
        }).success(function(response){
          console.log(response);
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
.directive("fileInput", function($parse){  
  return {  
       link: function($scope, element, attrs){  
        element.on("change", function(event){  
          var files = event.target.files;  
          console.log(files[0]);  
          $parse(attrs.fileInput).assign($scope, element[0].files);  
          $scope.$apply();  
        });  
       }  
  }  
});



