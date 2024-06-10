<?php

//get dishes by name

$jsonFile = '../data/datos.json';

// Get the content of the file

$jsonData = file_get_contents($jsonFile);

// Decode the JSON into an associative array

$data = json_decode($jsonData, true);

// Initialize the array for filtered dishes

$filteredDishes = [];

//El botón del evento es <button class="btn btn-primary" data-dish-name="${dish.name}">Ver más</button>
//Al pulsar el botón debe saltar el modal con la información del plato seleccionado







?>