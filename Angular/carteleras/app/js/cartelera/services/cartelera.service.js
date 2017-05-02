'use strict';

angular.module('myapp.cartelera')
.factory('CarteleraService', function(ENV, $http){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

  var getCartelera = function(id){
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

  return {
    getCartelera:getCartelera,
    getCarteleras:getCarteleras,
    getTodasPublicaciones,
    getPublicacion:getPublicacion,
    getComentarios:getComentarios,
    agregarComentario:agregarComentario
  };
});
