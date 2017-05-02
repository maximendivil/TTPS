angular.module('myapp.cartelera')
.controller('DetailCtrl', function($scope, $stateParams, CarteleraService) {

  $idPublicacion = $stateParams.brick;
  CarteleraService.getPublicacion($idPublicacion).then(function(response){
      $scope.brick = response.data;
  });
  //$scope.brick = $stateParams.brick;

  $scope.viewComment = false;

  $scope.comments = [];

  $scope.cargarComentarios = function() {
    CarteleraService.getComentarios($idPublicacion).then(function(response){
      $scope.comments = response.data;  
    });
  }

  $scope.cargarComentarios();
  //$scope.comments = [];

  /*$scope.comments.push({
    autor: 'Jorge Rosso',
    texto: 'Esto es el comentario de uno de los docentes de la c&aacute;tedra de TTPS 2016'
  });*/

  $scope.submit = function(){
    $scope.viewComment = false;

    CarteleraService.agregarComentario($scope.usuario.id,$scope.newComment,$idPublicacion).then(function(){
      $scope.cargarComentarios();
      console.log("Se agregó el comentario correctamente");
    })
    .catch(function(){
      console.log("Ocurrió un error al crear el comentario");
    });
    /*if(comment.texto){
      //agrego el nuevo comentario a la lista de comentarios
      $scope.comments.push(comment);

      //reseteo la variable
      $scope.newComment = '';
    }*/
  };

  $scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

});
