angular.module('myapp.login')
.controller('LoginCtrl', function($scope, $state, LoginService){

  //Se utiliza para mostrar un mensaje de error ante un logueo incorrecto
  $scope.loginErrorMessage = '';
  //Se utiliza para mostrar un mensaje de registro de usuario exitoso
  $scope.registroExitoso = '';
  //Se utiliza para manejar los formularios de logueo y de registro. Cuando es true, se visualiza el login. Caso contrario, el formulario de registro
  $scope.formLogin = true;

  //Se llama cuando se selecciona la opción "Crear una cuenta"
  $scope.registrarUsuario = function(){
    $scope.formLogin = false;
  }

  //Se llama cuando se selecciona la opción "Atrás" en el formulario de registro
  $scope.home = function() {
    $scope.formLogin = true;
  }

  //Se utiliza para verificar las credenciales del usuario contra el backend de carteleras. El backend, internamente, consultará con su base de datos o consumirá
  //los datos del APIRESTGuarani
  $scope.login = function(){
    console.log('Usuario: ' + $scope.username);
    console.log('Password: ' + $scope.password);

    LoginService.login($scope.username, $scope.password)
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
    $scope.formLogin = true;
    $scope.registroExitoso = 'El usuario fue dado de alta correctamente!';
    $scope.loginErrorMessage = '';
  }
});
