angular.module('myapp.cartelera')
.controller('DetailCtrl', function($scope, $stateParams, CarteleraService) {

  $idPublicacion = $stateParams.brick;
  CarteleraService.getPublicacion($idPublicacion).then(function(response){
      $scope.brick = response.data;
  });
  //$scope.brick = $stateParams.brick;

  $scope.viewComment = false;

  $scope.comments = [];

  CarteleraService.getComentarios($idPublicacion).then(function(response){
    $scope.comments = response.data;  
  });
  //$scope.comments = [];

  /*$scope.comments.push({
    autor: 'Jorge Rosso',
    texto: 'Esto es el comentario de uno de los docentes de la c&aacute;tedra de TTPS 2016'
  });*/

  $scope.submit = function(){
    $scope.viewComment = false;
    var comment = {
        creador: { nombre : 'Manuel', apellido : 'Ortiz' },
        texto: $scope.newComment  //binding entre la vista y el controller a traves del $scope
    };

    if(comment.texto){
      //agrego el nuevo comentario a la lista de comentarios
      $scope.comments.push(comment);

      //reseteo la variable
      $scope.newComment = '';
    }
  };

  $scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

});
