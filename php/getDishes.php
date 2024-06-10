<?php 

// header('Content-Type: application/json');

// $data = json_decode(file_get_contents('../data/datos.json'), true);

// if (isset($_GET['category'])) {
//     $category = $_GET['category'];
//     $filteredDishes = array_filter($data['dishes'], function($dish) use ($category) {
//         // Corrección: usar in_array para verificar si la categoría está en el array de categorías del plato
//         return in_array($category, $dish['categories']); 
//     });
//     echo json_encode($filteredDishes);
// } else {
//     echo json_encode($data['dishes']); // Devolver todos los platos si no se especifica categoría
// }


// header('Content-Type: application/json');

// $data = json_decode(file_get_contents('../data/datos.json'), true);

// if (isset($_GET['category'])) {
//     $category = $_GET['category'];

//     // Manejar categorías no encontradas
//     if (!in_array($category, array_column($data['categories'], 'name'))) {
//         http_response_code(400); // Bad Request
//         echo json_encode(['error' => 'Categoría no válida']);
//         exit;
//     }

//     $filteredDishes = array_filter($data['dishes'], function($dish) use ($category) {
//         return in_array($category, $dish['categories']); 
//     });
    
//     // Manejar platos no encontrados en la categoría
//     if (empty($filteredDishes)) {
//         http_response_code(404); // Not Found
//         echo json_encode(['error' => 'No se encontraron platos en esta categoría']);
//         exit;
//     }
    
//     echo json_encode($filteredDishes);
// } else {
//     echo json_encode($data['dishes']); // Devolver todos los platos si no se especifica categoría
// }

header('Content-Type: application/json');

$data = json_decode(file_get_contents('../data/datos.json'), true);

// if (isset($_GET['category'])) {
//     $category = $_GET['category'];
//     $filteredDishes = array_filter($data['dishes'], function($dish) use ($category) {
//         return in_array($category, $dish['categories']); 
//     });
   
//    if (empty($filteredDishes)) {
//         http_response_code(404); // Not Found
//         echo json_encode(['error' => 'No se encontraron platos en esta categoría']);
//         exit;
//     }
    
//     echo json_encode($filteredDishes);
// } else {
//     echo json_encode($data['dishes']); // Devolver todos los platos si no se especifica categoría
// }

//Hay que extraer de los datos de categories, los platos


// Ruta del archivo JSON dónde están las categorías y sus respectivos platos

//no no y no ....es categories[dishes] no dishes[categories]

// Ruta del archivo JSON
$jsonFile = '../data/datos.json';

$dishes = array_column($data['categories'], 'dishes');
// Obtener el contenido del archivo
$jsonData = file_get_contents($jsonFile);

// Decodificar el JSON en un array asociativo
$data = json_decode($jsonData, true);

// Extraer todos los platos en un solo array
$filtererDishes=[];
foreach ($data['categories'] as $category) {
    if ($category['name'] === $_GET['category']) {
        foreach ($category['dishes'] as $dishName) {
            $filteredDishes[] = [
                'name' => $dishName,
                'image' => $category['image'], // Añadir la ruta de la imagen
                'description' => $category['description'] // Añadir la descripción de la categoría
            ];
        }
        break; // Salir del bucle una vez encontrada la categoría
    }
}

// Devolver los platos filtrados
echo json_encode($filteredDishes);
