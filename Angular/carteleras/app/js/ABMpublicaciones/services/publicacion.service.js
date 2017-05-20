'use strict';

angular.module('myapp.ABMpublicaciones')
.factory('PublicacionService', function(ENV, $http){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

  var agregarPublicacion = function(usuario, titulo, descripcion, comentarios, idCartelera) {
    return $http.post(ENV.endpoint.url + '/Carteleras/' + idCartelera,
    {
      "titulo": titulo,
      "fechaCreacion": new Date(),
      "descripcion": descripcion,
      "multimedia": 'casa',
      "aceptaComentarios": comentarios,
      "creador": { 
        "id" :  usuario
      },
      "cartelera": {
        "id" : idCartelera
      }
    }, config);
  };

  var modificarPublicacion = function(id, titulo, descripcion, comentarios) {
    return $http.put(ENV.endpoint.url + '/Publicaciones/' + id,
    {
      "titulo": titulo,
      "descripcion": descripcion,
      "multimedia": casa,
      "creador": { 
        "id" :  usuario
      }
    }, config);
  };

  return {
    agregarPublicacion:agregarPublicacion,
    modificarPublicacion:modificarPublicacion
  };
});
