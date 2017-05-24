'use strict';

angular.module('myapp.ABMpublicaciones')
.factory('PublicacionService', function(ENV, $http){

  var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

  var uploadFilePublicacion = function(file,usuario,nombre){
    var fd = new FormData();
    fd.append('file',file);
    fd.append('name',nombre);
    return $http.post("uploadFilePublicacion.php",fd,{
      transformRequest: angular.identity,
      headers:{'Content-Type': undefined}
    });
  };

  var agregarPublicacion = function(usuario, titulo, descripcion, comentarios, idCartelera, multimedia) {
    return $http.post(ENV.endpoint.url + '/Carteleras/' + idCartelera,
    {
      "titulo": titulo,
      "fechaCreacion": new Date(),
      "descripcion": descripcion,
      "multimedia": multimedia,
      "aceptaComentarios": comentarios,
      "creador": { 
        "id" :  usuario
      },
      "cartelera": {
        "id" : idCartelera
      }
    }, config);
  };

  var modificarPublicacion = function(id, titulo, descripcion, comentarios, idCartelera, multimedia, tieneArchivo) {
    return $http.put(ENV.endpoint.url + '/Publicaciones/' + id,
    {
      "titulo": titulo,
      "descripcion": descripcion,
      "aceptaComentarios": comentarios,
      "tieneArchivo": tieneArchivo,
      "multimedia": multimedia
    }, config);
  };

  var eliminarPublicacion = function(id) {
    return $http.delete(ENV.endpoint.url + '/Publicaciones/' + id, config);
  };

  return {
    agregarPublicacion:agregarPublicacion,
    modificarPublicacion:modificarPublicacion,
    eliminarPublicacion:eliminarPublicacion,
    uploadFilePublicacion:uploadFilePublicacion
  };
});
