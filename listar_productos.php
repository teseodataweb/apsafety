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
    $query = isset($_GET['query']) ? strtolower(trim($_GET['query'])) : '';
    $clasificacion = isset($_GET['clasificacion']) ? $_GET['clasificacion'] : '';
    $activo = isset($_GET['activo']) ? strtolower($_GET['activo']) : '';

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
                    $titulo = strtolower($producto['titulo'] ?? '');
                    $descripcion = strtolower($producto['descripcion'] ?? '');
                    $prodClasificacion = $producto['clasificacion'] ?? '';
                    $prodActivo = $producto['activo'] ?? false;
                    
                    // Filtrar por búsqueda
                    if ($query !== '') {
                        if (strpos($titulo, $query) === false && strpos($descripcion, $query) === false) {
                            continue;
                        }
                    }
                    
                    // Filtrar por clasificación (solo si no es 'Todos los productos')
                    if ($clasificacion !== '' && $clasificacion !== 'Todos los productos' && $clasificacion !== $prodClasificacion) {
                        continue;
                    }
                    
                    // Filtrar por estado activo
                    if ($activo !== '' && $activo != (strtolower($prodActivo))) {
                        continue;
                    }
                    
                    $productos[] = [
                        'titulo' => $producto['titulo'] ?? '',
                        'descripcion' => $producto['descripcion'] ?? '',
                        'unidadMedida' => $producto['unidadMedida'] ?? '',
                        'clasificacion' => $prodClasificacion,
                        'ventajas' => $producto['ventajas'] ?? '',
                        'aplicaciones' => $producto['aplicaciones'] ?? '',
                        'tipo' => $producto['tipo'] ?? '',
                        'activo' => $prodActivo,
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