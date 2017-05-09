'use strict';

angular.module('myapp.ABMusuarios')
.factory('UsuarioService', function(ENV, $http){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

  var getUsuarios = function(){
    return $http.get(ENV.endpoint.url + '/Usuarios');
  };

  return {
    getUsuarios:getUsuarios
  };
});