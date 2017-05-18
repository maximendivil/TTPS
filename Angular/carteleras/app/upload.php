<?php 
	$extensionesPermitidas = array("jpg","jpeg","gif","png");
	$extensionArchivo = end(explode(".",$_FILES["file"]["name"]));
	$dir = 'js/cartelera/img/';
	var_dump($_FILES);
	//echo "$extensionArchivo";
	echo $dir . basename($_FILES['file']['name']);
	if ((($_FILES['file']['type'] == "image/gif")
		|| ($_FILES['file']['type'] == "image/jpeg")
		|| ($_FILES['file']['type'] == "image/png")
		|| ($_FILES['file']['type'] == "image/jpg")) 
		&& ($_FILES['file']['size'] < 80000)
		&& in_array($extensionArchivo, $extensionesPermitidas))
	{
			if (move_uploaded_file($_FILES['file']['tmp_name'], $dir . basename($_FILES['file']['name'])))
			{
				echo "Archivo: " . $_FILES["file"]["name"] ."<br>";
				echo "Tipo: " . $_FILES["file"]["type"] ."<br>";
				echo "Tamaño " . $_FILES["file"]["size"] ."<br>";
				echo "Guardado en " . $_FILES["file"]["tmp_name"] ."<br>";
			}
			else {
				echo "Error: " . $_FILES["file"]["error"] . "<br>";
			}	
	}
	else {
		echo "Archivo inválido";
	}
  
?>