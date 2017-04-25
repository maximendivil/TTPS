/**
* Modulo principal.
*
* Este modulo depende de todos los modulos con conforman el sistema, y se encarga de inicializarlos
*
*/
angular.module('myapp', [
	'ui.router',
	'myapp.cartelera',
	'myapp.perfil',
	'LocalStorageModule',
	'wu.masonry',
	'myapp.login',
	'myapp.environment'
]);

angular.module('myapp.cartelera', []);
angular.module('myapp.login', []);
angular.module('myapp.perfil', []);
