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

  var getUsuario = function(id){
    return $http.get(ENV.endpoint.url + '/Usuarios/' + id);
  };

  var modificarPermisos = function(usuario) {
    return $http.put(ENV.endpoint.url + '/Usuarios/modificarPermisos',
    {
        'id' : usuario.id,
        'rol' : usuario.rol
    }, config);
  };

  return {
    getUsuarios:getUsuarios,
    getUsuario:getUsuario,
    modificarPermisos:modificarPermisos
  };
});