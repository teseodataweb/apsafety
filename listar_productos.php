<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$response = ['success' => false, 'message' => ''];

try {
    $baseDir = __DIR__ . '/Productos';
    
    if (!is_dir($baseDir)) {
        throw new Exception("No existe la carpeta de productos");
    }
    
    $productos = [];
    $carpetas = scandir($baseDir);
    
    foreach ($carpetas as $carpeta) {
        if ($carpeta === '.' || $carpeta === '..') continue;
        
        $carpetaPath = $baseDir . '/' . $carpeta;
        
        if (is_dir($carpetaPath)) {
            $archivosJson = glob($carpetaPath . '/*.json');
            
            if (count($archivosJson) > 0) {
                $jsonFile = $archivosJson[0];
                $contenido = file_get_contents($jsonFile);
                $producto = json_decode($contenido, true);
                
                if ($producto) {
                    // Incluir TODOS los campos del producto
                    $productos[] = [
                        'titulo' => $producto['titulo'] ?? '',
                        'descripcion' => $producto['descripcion'] ?? '',
                        'unidadMedida' => $producto['unidadMedida'] ?? '',
                        'clasificacion' => $producto['clasificacion'] ?? '',
                        'ventajas' => $producto['ventajas'] ?? '',
                        'aplicaciones' => $producto['aplicaciones'] ?? '',
                        'tipo' => $producto['tipo'] ?? '',
                        'activo' => $producto['activo'] ?? false,
                        'fechaCreacion' => $producto['fechaCreacion'] ?? '',
                        'fichaTecnica' => $producto['fichaTecnica'] ?? '',
                        'imagenPrincipal' => $producto['imagenPrincipal'] ?? '',
                        'sellos' => $producto['sellos'] ?? [],
                        'imagenes' => $producto['imagenes'] ?? [],
                        'ruta' => $producto['ruta'] ?? ''
                    ];
                }
            }
        }
    }
    
    $response = [
        'success' => true,
        'productos' => $productos
    ];
    
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>