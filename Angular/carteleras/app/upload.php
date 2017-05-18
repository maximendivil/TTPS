<?php 
  $path = '/js/cartelera/img/'. $_POST['file']['name'];
  if (move_uploaded_file($_POST['file']['tmp_name'], $path)) {
    echo 'file uploaded';
  }
  else{
    echo 'file error';
  }
  
?>