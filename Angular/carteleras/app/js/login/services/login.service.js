'use strict';
angular.module('myapp.login')
.factory('LoginService', function(ENV, $http, $q, $rootScope){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };
  
  var login = function(user, password) {
    var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/Usuarios/Login',
    {
      'usuario': user,
      'password': password
    }, config)
    .success(function(data){
      console.log('El login responde: ');
      console.log(data);
      localStorage.setItem('tokenSeguridad', data.token.token);
      var usuario = angular.toJson(data.usuario);
      localStorage.setItem('usuario', usuario);
      //$rootScope.usuario = data.usuario;
      defer.resolve(data);
    })
    .error(defer.reject);

    return defer.promise;
  };

  var crearUsuario = function(usuario) {
    /*var defer = $q.defer();
    $http.post(ENV.endpoint.url + '/Usuarios',
    {
      'nombre' : usuario.nombre,
      'apellido' : usuario.apellido,
      'fechaNacimiento' : usuario.fechaNacimiento,
      'dni' : usuario.dni,
      'email' : usuario.dni,
      'usuario': usuario.username,
      'password' : usuario.password1,
      'rol' : 4
    }, config)
    .success(function(data){
      //$rootScope.usuario = data.usuario;
      defer.resolve(data);
    })
    .error(defer.reject);

    return defer.promise;*/
    return $http.post(ENV.endpoint.url + '/Usuarios',
    {
      'nombre' : usuario.nombre,
      'apellido' : usuario.apellido,
      'fechaNacimiento' : usuario.fechaNacimiento,
      'dni' : usuario.dni,
      'email' : usuario.dni,
      'usuario': usuario.username,
      'password' : usuario.password1,
      'rol' : 4
    }, config);
  };

  var logout = function() {
    var defer = $q.defer();
    // invalido el token
    localStorage.removeItem('tokenSeguridad');
    localStorage.removeItem('usuario');
    defer.resolve();

    return defer.promise;
  };

  var isLoggedIn = function() {
    var isToken = angular.isDefined(getToken()) && getToken() !== null;
    return isToken;
  };

  var getToken = function() {
    return localStorage.getItem('tokenSeguridad');
  };


  return {
    login: login,
    logout: logout,
    crearUsuario: crearUsuario,
    getToken: getToken,
    isLoggedIn: isLoggedIn
  };
})
