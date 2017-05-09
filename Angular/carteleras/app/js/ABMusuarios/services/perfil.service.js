'use strict';

angular.module('myapp.perfil')
.factory('PerfilService', function(ENV, $http, $q){

	var config = {
	    headers : {
	      'Content-Type': 'application/json;charset=utf-8;',
	    }
  	};

	/*var factory = {
		modificarUsuario: modificarUsuario
	};
	return factory;*/


	var modificarUsuario = function(usuario) {
		/*var defer = $q.defer();
		var usr = {'usuario': usuario};
		
			.then(
			function (response) {
				defer.resolve(response.data);
			},
			function (errResponse){
				console.error('Error al modificar el usuario');
				defer.reject(errResponse);
			}
		);
		return defer.promise;*/
		return $http.put(ENV.endpoint.url + '/Usuarios/modificar',
		{
	      'nombre' : usuario.nombre,
	      'id' : usuario.id,
	      'apellido' : usuario.apellido,
	      'fechaNacimiento' : usuario.fechaNacimiento,
	      'dni' : usuario.dni,
	      'email' : usuario.email,
	      'usuario': usuario.usuario,
	      'password' : usuario.password,
	      'rol' : usuario.rol
	    }, config);
	}

	return {
		modificarUsuario: modificarUsuario
	};
});