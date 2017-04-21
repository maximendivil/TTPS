'use strict';

angular.module('myapp.cartelera')
.factory('CarteleraService', function(ENV, $http){

  var getCartelera = function(id){
    return $http.get(ENV.endpoint.url + '/Carteleras/' + id);
  };

  var config = {
    headers : {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    }
  }

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

  return {
    getCartelera:getCartelera,
    getCarteleras:getCarteleras,
    getTodasPublicaciones,
    getPublicacion:getPublicacion,
    getComentarios:getComentarios
  };
});
