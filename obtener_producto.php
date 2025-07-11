<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$response = ['success' => false, 'message' => ''];

try {
    $ruta = $_GET['ruta'] ?? '';
    if (empty($ruta)) {
        throw new Exception("No se proporcionó la ruta del producto");
    }
    
    $baseDir = __DIR__ . '/Productos';
    $carpetaPath = $baseDir . '' . $ruta;
    
    if (!is_dir($carpetaPath)) {
        throw new Exception("No existe la carpeta del producto");
    }
    
    $archivosJson = glob($carpetaPath . '/*.json');
    if (count($archivosJson) === 0) {
        throw new Exception("No se encontró el archivo JSON del producto");
    }
    
    $jsonFile = $archivosJson[0];
    $contenido = file_get_contents($jsonFile);
    $producto = json_decode($contenido, true);
    
    if (!$producto) {
        throw new Exception("Error al decodificar el archivo JSON");
    }
    
    $response = [
        'success' => true,
        'producto' => $producto
    ];
    
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>