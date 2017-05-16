angular.module('myapp.perfil')
.controller('PerfilCtrl', function($scope, $state, PerfilService, UsuarioService, $http){

  var formdata = new FormData();
    $scope.getTheFiles = function ($files) {
      console.log($files[0].type + " files");
        angular.forEach($files, function (value, key) {
            console.log(key + ' ' + value.name);
            formdata.append(key, value);

        });
    };
    // NOW UPLOAD THE FILES.
    $scope.uploadFiles = function () {
        var request = {
            method: 'POST',
            url: '/api/fileupload/', //Hay que agregar un campo en la base.
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        };
        // SEND THE FILES.
        $http(request)
            .success(function (d) {
                alert(d);
            })
            .error(function () {
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
.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ])



