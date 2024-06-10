<?php 
//Tenemos un archivo json con los datos de los dishes, categories, allergens...etc
//en este script vamos a obtener las categorias (categories) de los dishes

header('Content-Type: application/json');

try{

    $data = json_decode(file_get_contents('../data/datos.json'), true);

   if (isset($_GET['category'])) {
        $category = $_GET['category'];
        $categories = array_filter($data['categories'], function($cat) use ($category){
            return $cat['name'] === $category;
        });
    } else {
        $categories = $data['categories'];
    }
    



    echo json_encode($categories, JSON_PRETTY_PRINT);


}catch(Exception $e){
    echo json_encode(array(
        'error' => $e->getMessage()
    ));
}


?>

