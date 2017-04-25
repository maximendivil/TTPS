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
		var defer = $q.defer();
		var usr = {'usuario': usuario};
		$http.post(ENV.endpoint.url + 'Usuarios/modificar', usr, config)
			.then(
			function (response) {
				defer.resolve(response.data);
			},
			function (errResponse){
				console.error('Error al modificar el usuario');
				defer.reject(errResponse);
			}
		);
		return defer.promise;
	}

	return {
		modificarUsuario: modificarUsuario
	};
});