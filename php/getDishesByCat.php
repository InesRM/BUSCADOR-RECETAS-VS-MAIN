<?php 


$jsonFile = '../data/datos.json';

// Obtener el contenido del archivo
$jsonData = file_get_contents($jsonFile);

// Decodificar el JSON en un array asociativo
$data = json_decode($jsonData, true);

// Inicializar el array para platos filtrados
$filteredDishes = [];

// Verificar si se ha pasado una categoría como parámetro
if (isset($_GET['category'])) {
    $selectedCategory = $_GET['category'];

    // Buscar la categoría seleccionada
    foreach ($data['categories'] as $category) {
        if ($category['name'] === $selectedCategory) {
            // Para cada plato en la categoría, buscar sus detalles en la lista de platos
            foreach ($category['dishes'] as $dishName) {
                foreach ($data['dishes'] as $dish) {
                    if ($dish['name'] === $dishName) {
                        $filteredDishes[] = $dish;
                        break;
                    }
                }
            }
            break; // Salir del bucle una vez encontrada la categoría
        }
    }
}

// Devolver los platos filtrados en formato JSON
echo json_encode($filteredDishes);
?>