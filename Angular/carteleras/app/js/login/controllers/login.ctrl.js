angular.module('myapp.login')
.controller('LoginCtrl', function($scope, $state, LoginService){

  //Se utiliza para mostrar un mensaje de error ante un logueo incorrecto
  $scope.loginErrorMessage = '';
  //Se utiliza para mostrar un mensaje de registro de usuario exitoso
  $scope.registroExitoso = '';
  //Se utiliza para manejar los formularios de logueo y de registro. Cuando es true, se visualiza el login. Caso contrario, el formulario de registro
  $scope.formLogin = true;

  $scope.registro = {};
  $scope.usuario = {};

  //Se llama cuando se selecciona la opción "Crear una cuenta"
  $scope.registrarUsuario = function(){
    $scope.formLogin = false;
  }

  //Se llama cuando se selecciona la opción "Atrás" en el formulario de registro
  $scope.home = function() {
    $scope.formLogin = true;
  }

  $scope.username = '';
  $scope.password = '';

  //Se utiliza para verificar las credenciales del usuario contra el backend de carteleras. El backend, internamente, consultará con su base de datos o consumirá
  //los datos del APIRESTGuarani
  $scope.login = function(){
    console.log('Usuario: ' + $scope.usuario.username);
    console.log('Password: ' + $scope.usuario.password);
    $scope.registroExitoso = '';
    LoginService.login($scope.usuario.username, $scope.usuario.password)
    .then(function(){
      $scope.loginErrorMessage = '';
      $scope.registroExitoso = ''; //reset error message
      $state.go('cartelera');
    })
    .catch(function(){
      $scope.loginErrorMessage = 'Usuario o Contraseña invalido. Por favor, vuelva a intentarlo';
    });
  }

  //Se llama cuando se registra a un usuario
  $scope.crearUsuario = function(){
    LoginService.crearUsuario($scope.registro)
    .then(function(){
      $scope.formLogin = true;
      $scope.registroExitoso = 'El usuario fue dado de alta correctamente!';
      $scope.loginErrorMessage = '';
      console.log($scope.registro);
    })
    .catch(function(){
      $scope.registroExitoso = 'Ocurrió un error al dar de alta el usuario';
    });    
  }
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
});
