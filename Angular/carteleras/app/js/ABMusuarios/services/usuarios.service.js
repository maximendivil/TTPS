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

  var getPublicadores = function(){
    return $http.get(ENV.endpoint.url + '/Usuarios/Publicadores');
  };

  var getAlumnosInteresados = function(idCartelera){
    return $http.get(ENV.endpoint.url + '/Usuarios/AlumnosInteresados/' + idCartelera);
  };

  var getPublicadoresHabilitados = function(idCartelera){
    return $http.get(ENV.endpoint.url + '/Usuarios/PublicadoresHabilitados/' + idCartelera);
  };

  var getPublicadoresSinPermiso = function(idCartelera){
    return $http.get(ENV.endpoint.url + '/Usuarios/PublicadoresSinPermiso/' + idCartelera);
  };

  var getAdministradores = function(){
    return $http.get(ENV.endpoint.url + '/Usuarios/Get/1');
  };

  var getUsuario = function(id){
    return $http.get(ENV.endpoint.url + '/Usuarios/' + id);
  };

  var getIntereses = function(id){
    return $http.get(ENV.endpoint.url + '/Usuarios/GetIntereses/' + id);
  };

  var darPermisos = function(usuario, idCartelera){
    return $http.post(ENV.endpoint.url + '/Usuarios/Publicadores/DarPermiso/' + idCartelera, 
    {
      'nombre' : usuario.nombre,
      'id' : usuario.id,
      'apellido' : usuario.apellido,
      'dni' : usuario.dni,
      'email' : usuario.email,
      'usuario': usuario.usuario,
      'password' : usuario.password,
      'rol' : usuario.rol
    }, config);
  };

  var quitarPermisos = function(usuario, idCartelera){
    return $http.put(ENV.endpoint.url + '/Usuarios/Publicadores/QuitarPermiso/' + idCartelera, 
    {
      'nombre' : usuario.nombre,
      'id' : usuario.id,
      'apellido' : usuario.apellido,
      'dni' : usuario.dni,
      'email' : usuario.email,
      'usuario': usuario.usuario,
      'password' : usuario.password,
      'rol' : usuario.rol
    }, config);
  };

  var agregarInteres = function(usuario, idCartelera){
    return $http.post(ENV.endpoint.url + '/Usuarios/Intereses/' + idCartelera, 
    {
      'nombre' : usuario.nombre,
      'id' : usuario.id,
      'apellido' : usuario.apellido,
      'dni' : usuario.dni,
      'email' : usuario.email,
      'usuario': usuario.usuario,
      'password' : usuario.password,
      'rol' : usuario.rol
    }, config);
  };

  var quitarInteres = function(usuario, idCartelera){
    return $http.put(ENV.endpoint.url + '/Usuarios/Intereses/' + idCartelera, 
    {
      'nombre' : usuario.nombre,
      'id' : usuario.id,
      'apellido' : usuario.apellido,
      'dni' : usuario.dni,
      'email' : usuario.email,
      'usuario': usuario.usuario,
      'password' : usuario.password,
      'rol' : usuario.rol
    }, config);
  };

  var eliminarUsuario = function(id){
    return $http.delete(ENV.endpoint.url + '/Usuarios/' + id);
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
    getAdministradores:getAdministradores,
    getUsuario:getUsuario,
    eliminarUsuario:eliminarUsuario,
    getIntereses:getIntereses,
    agregarInteres:agregarInteres,
    quitarInteres:quitarInteres,
    getPublicadores:getPublicadores,
    getPublicadoresHabilitados:getPublicadoresHabilitados,
    getPublicadoresSinPermiso:getPublicadoresSinPermiso,
    darPermisos:darPermisos,
    quitarPermisos:quitarPermisos,
    getAlumnosInteresados:getAlumnosInteresados
  };
});