<?php

//get dishes by name

$jsonFile = '../data/datos.json';

// Get the content of the file

$jsonData = file_get_contents($jsonFile);

// Decode the JSON into an associative array

$data = json_decode($jsonData, true);

// Buscar si el parámetro name está presente en la URL

if (isset($_GET['name'])) {
    $dishName = $_GET['name'];
    $dish = null;
    foreach ($data['dishes'] as $d) {
        if ($d['name'] === $dishName) {
            $dish = $d;
            break; // Se encuentra el plato, se sale del bucle
        }
    }
    if ($dish) {
        echo json_encode($dish);
    } else {
        echo json_encode(null); // Si no se encuentra el plato, devuelve null
        echo json_encode(['error' => 'Plato no encontrado']);
    }
} 
