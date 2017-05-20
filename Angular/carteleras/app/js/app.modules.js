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
	'myapp.administracion',
	'myapp.ABMpublicaciones',
	'myapp.ABMusuarios',
	'myapp.ABMpermisos',
	'myapp.Intereses',
	'myapp.AlumnosInteresados',
	'LocalStorageModule',
	'wu.masonry',
	'myapp.login',
	'myapp.environment'
]);

angular.module('myapp.cartelera', []);
angular.module('myapp.login', []);
angular.module('myapp.perfil', []);
angular.module('myapp.administracion', []);
angular.module('myapp.ABMpublicaciones', []);
angular.module('myapp.ABMusuarios', []);
angular.module('myapp.Intereses', []);
angular.module('myapp.ABMpermisos', []);
angular.module('myapp.AlumnosInteresados', []);
