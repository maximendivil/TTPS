<?php 
	$extension = end(explode(".", $_FILES['file']['name']));
	$nombre = $_POST["name"];
	$dir = 'js/cartelera/img/';
	if (! is_dir($dir)){
		mkdir($dir,0777);
	}
	if (move_uploaded_file($_FILES['file']['tmp_name'], $dir . $nombre))
	{
		echo "Archivo: " . $_FILES["file"]["name"] ."<br>";
		echo "Tipo: " . $_FILES["file"]["type"] ."<br>";
		echo "Tamaño " . $_FILES["file"]["size"] ."<br>";
		echo "Guardado en " . $_FILES["file"]["tmp_name"] ."<br>";
	}
	else {
		echo "Error: " . $_FILES["file"]["error"] . "<br>";
	}  
?>