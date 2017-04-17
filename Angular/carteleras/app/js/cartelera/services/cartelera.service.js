'use strict';

angular.module('myapp.cartelera')
.factory('CarteleraService', function($http){

  var getCartelera = function(id){
    return $http.get('http://localhost:8080/Grupo4/carteleras/' + id);
  };

  var config = {
    headers : {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    }
  }

  var getCarteleras = function() {
    return $http.get('http://localhost:8080/Grupo4/carteleras');
  }

  var getTodasPublicaciones = function() {
    return $http.get('http://localhost:8080/Grupo4/publicaciones');
  }

  var getPublicacion = function(id) {
    return $http.get('http://localhost:8080/Grupo4/publicaciones/' + id);
  }

  var getComentarios = function(id) {
    return $http.get('http://localhost:8080/Grupo4/publicaciones/comentarios/' + id);
  }

  return {
    getCartelera:getCartelera,
    getCarteleras:getCarteleras,
    getTodasPublicaciones,
    getPublicacion:getPublicacion,
    getComentarios:getComentarios
  };
});
