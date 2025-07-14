<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = ['success' => false, 'message' => ''];

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $ruta = $data['ruta'] ?? '';

    if (empty($ruta)) {
        throw new Exception('Ruta del producto no proporcionada');
    }

    $baseDir = __DIR__ . '/./Productos/';
    $productDir = $baseDir . basename($ruta);

    if (!is_dir($productDir)) {
        throw new Exception('La carpeta del producto no existe');
    }

    // Eliminar la carpeta y su contenido
    $files = array_diff(scandir($productDir), ['.', '..']);
    foreach ($files as $file) {
        $filePath = $productDir . '/' . $file;
        is_dir($filePath) ? rmdir($filePath) : unlink($filePath);
    }
    rmdir($productDir);

    $response = [
        'success' => true,
        'message' => 'Producto eliminado exitosamente'
    ];

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
