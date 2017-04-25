'use strict';


angular.module('myapp.perfil')
.factory('PerfilService', function($http, $q){

	var config = {
    headers : {
      'Content-Type': 'application/json;charset=utf-8;',
    }
  };

	var factory = {
		modificarUsuario: modificarUsuario
	};
	return factory;


	function modificarUsuario(usuario) {
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
});