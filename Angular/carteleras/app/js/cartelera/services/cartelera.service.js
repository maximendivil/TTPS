'use strict';

angular.module('myapp.cartelera')
.factory('CarteleraService', function(ENV, $http){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

  var getCartelera = function(id){
    return $http.get(ENV.endpoint.url + '/Carteleras/Publicaciones/' + id);
  };  

  var getCarteleraPorId = function(id){
    return $http.get(ENV.endpoint.url + '/Carteleras/' + id);
  };    

  var getCarteleras = function() {
    return $http.get(ENV.endpoint.url + '/Carteleras');
  }

  var getTodasPublicaciones = function() {
    return $http.get(ENV.endpoint.url + '/Publicaciones');
  }

  var getPublicacion = function(id) {
    return $http.get(ENV.endpoint.url + '/Publicaciones/' + id);
  }

  var getComentarios = function(id) {
    return $http.get(ENV.endpoint.url + '/Publicaciones/Comentarios/' + id);
  }

  var agregarComentario = function(usuario, texto, idPublicacion) {
    return $http.post(ENV.endpoint.url + '/Publicaciones/Comentarios/' + idPublicacion,
    {
      "texto": texto,
      "fechaCreacion": new Date(),
      "publicacion": { 
        "id" : idPublicacion
      },
      "creador": { 
        "id" :  usuario
      }
    }, config);
  };

  var agregarCartelera = function(nombre, privacidad) {
    return $http.post(ENV.endpoint.url + '/Carteleras',
    {
      "nombre": nombre,
      "publica": privacidad,
      "fechaCreacion": new Date()
    }, config);
  };

  var modificarCartelera = function(id, nombre, privacidad) {
    return $http.put(ENV.endpoint.url + '/Carteleras/' + id,
    {
      "nombre": nombre,
      "publica": privacidad
    }, config);
  };

  var eliminarCartelera = function(id) {
    return $http.delete(ENV.endpoint.url + '/Carteleras/' + id, config);
  };

  return {
    getCartelera:getCartelera,
    getCarteleras:getCarteleras,
    getTodasPublicaciones,
    getPublicacion:getPublicacion,
    getComentarios:getComentarios,
    agregarComentario:agregarComentario,
    agregarCartelera:agregarCartelera,
    modificarCartelera:modificarCartelera,
    eliminarCartelera:eliminarCartelera,
    getCarteleraPorId:getCarteleraPorId
  };
});
