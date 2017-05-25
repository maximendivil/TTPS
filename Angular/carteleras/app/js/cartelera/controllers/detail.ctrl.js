angular.module('myapp.cartelera')
.controller('DetailCtrl', function($scope, $stateParams, CarteleraService) {

  $idPublicacion = $stateParams.brick;
  $scope.edita = $stateParams.edita;
  CarteleraService.getPublicacion($idPublicacion).then(function(response){
      $scope.brick = response.data;
  });

  $scope.viewComment = false;

  $scope.comments = [];

  $scope.cargarComentarios = function() {
    CarteleraService.getComentarios($idPublicacion).then(function(response){
      $scope.comments = response.data;  
    });
  }

  $scope.cargarComentarios();

  $scope.submit = function(){
    $scope.viewComment = false;

    CarteleraService.agregarComentario($scope.usuario.id,$scope.newComment,$idPublicacion).then(function(){
      $scope.cargarComentarios();
      console.log("Se agregó el comentario correctamente");
    })
    .catch(function(){
      console.log("Ocurrió un error al crear el comentario");
    });
  };

  $scope.usuario = angular.fromJson(localStorage.getItem('usuario'));

});
