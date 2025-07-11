<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'GitHubHelper.php';

$response = ['success' => false, 'message' => ''];

try {
    // Validar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método no permitido");
    }
        file_put_contents('debug.log', print_r([
        'POST' => $_POST,
        'FILES' => $_FILES,
        'INPUT_RAW' => file_get_contents('php://input') // Para ver datos crudos
    ], true));
    
    // Obtener datos del formulario
    $input = json_decode(file_get_contents('php://input'), true) ?: $_POST;
    
    // Procesar archivos (si se envían como multipart/form-data)
    $files = $_FILES ?: [];
    
    // Preparar datos del producto
    $productData = [
        'titulo' => $input['titulo'] ?? '',
        'descripcion' => $input['descripcion'] ?? '',
        'unidadMedida' => $input['unidadMedida'] ?? '',
        'clasificacion' => $input['clasificacion'] ?? '',
        'ventajas' => $input['ventajas'] ?? '',
        'aplicaciones' => $input['aplicaciones'] ?? '',
        'tipo' => $input['tipo'] ?? '',
        'activo' => filter_var($input['activo'] ?? true, FILTER_VALIDATE_BOOLEAN),
        'fechaCreacion' => $input['fechaCreacion'] ?? date('Y-m-d H:i:s')
    ];
    
    // Procesar archivos adjuntos
    if (!empty($files['imagenPrincipal']['tmp_name'])) {
        $productData['imagenPrincipal'] = base64_encode(file_get_contents($files['imagenPrincipal']['tmp_name']));
    }
    
    if (!empty($files['fichaTecnica']['tmp_name'])) {
        $productData['fichaTecnica'] = base64_encode(file_get_contents($files['fichaTecnica']['tmp_name']));
    }
    
    // Procesar múltiples sellos
    if (!empty($files['sellos']['tmp_name'][0])) {
        $productData['sellos'] = [];
        foreach ($files['sellos']['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $productData['sellos'][] = base64_encode(file_get_contents($tmpName));
            }
        }
    }
    
    // Procesar múltiples imágenes
    if (!empty($files['imagenes']['tmp_name'][0])) {
        $productData['imagenes'] = [];
        foreach ($files['imagenes']['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $productData['imagenes'][] = base64_encode(file_get_contents($tmpName));
            }
        }
    }
    
    // Guardar en GitHub
    $githubHelper = new GitHubHelper();
    $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($productData['titulo']));
    $result = $githubHelper->saveProduct($slug, $productData);
    

      // Añade también el resultado a los logs
    file_put_contents('debug.log', print_r(['RESULT' => $result], true), FILE_APPEND);

    $response = $result;

} catch (Exception $e) {
    $response['message'] = "Error: ".$e->getMessage();
}


echo json_encode($response);
?>