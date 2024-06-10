<?php 
//Get recetas del archivo ../data/datos.json

//Leer archivo
$datos = file_get_contents("../data/datos.json");
//Decodificar JSON
$datos = json_decode($datos, true);

//Obtener recetas
$recetas = $datos['dishes'];

//Imprimir recetas
echo json_encode($recetas);

?>