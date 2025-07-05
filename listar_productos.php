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
    $rutaParam = isset($_GET['ruta']) ? $_GET['ruta'] : '';
    $modoDetalle = ($rutaParam !== '');

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
                    
                    // Filtros
                    if ($query !== '' && strpos($titulo, $query) === false && strpos($descripcion, $query) === false) continue;
                    if ($clasificacion !== '' && $clasificacion !== 'Todos los productos' && $clasificacion !== $prodClasificacion) continue;
                    if ($activo !== '' && $activo != strtolower($prodActivo)) continue;
                    if ($rutaParam !== '' && $producto['ruta'] !== $rutaParam) continue;

                    // Leer archivos físicos
                    $imagenPrincipal = '';
                    $fichaTecnica = '';
                    $sellos = [];
                    $imagenes = [];

                    // 1. Buscar imagen principal en raíz
                    $archivos = scandir($carpetaPath);
                    foreach ($archivos as $archivo) {
                        if ($archivo === '.' || $archivo === '..') continue;
                        $rutaArchivo = $carpetaPath . '/' . $archivo;
                        $extension = strtolower(pathinfo($archivo, PATHINFO_EXTENSION));
                        
                        if (is_file($rutaArchivo)) {
                            // Imagen principal
                            if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                                $imagenPrincipal = base64_encode(file_get_contents($rutaArchivo));
                            }
                            // PDF
                            if ($extension === 'pdf') {
                                $fichaTecnica = base64_encode(file_get_contents($rutaArchivo));
                            }
                        }
                    }

                    // 2. Carpeta Sellos
                    $sellosPath = $carpetaPath . '/Sellos';
                    if (is_dir($sellosPath)) {
                        $archivosSellos = scandir($sellosPath);
                        foreach ($archivosSellos as $sello) {
                            if ($sello === '.' || $sello === '..') continue;
                            $rutaSello = $sellosPath . '/' . $sello;
                            $extension = strtolower(pathinfo($sello, PATHINFO_EXTENSION));
                            
                            if (is_file($rutaSello) && in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                                $sellos[] = base64_encode(file_get_contents($rutaSello));
                            }
                        }
                    }

                    // 3. Carpeta Imágenes
                    $imagenesPath = $carpetaPath . '/imágenes';
                    if (!is_dir($imagenesPath)) $imagenesPath = $carpetaPath . '/imagenes';
                    
                    if (is_dir($imagenesPath)) {
                        $archivosImagenes = scandir($imagenesPath);
                        foreach ($archivosImagenes as $img) {
                            if ($img === '.' || $img === '..') continue;
                            $rutaImg = $imagenesPath . '/' . $img;
                            $extension = strtolower(pathinfo($img, PATHINFO_EXTENSION));
                            
                            if (is_file($rutaImg) && in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
                                $imagenes[] = base64_encode(file_get_contents($rutaImg));
                            }
                        }
                    }

                    // Solo en detalle leer PDF completo
                    if (!$modoDetalle) {
                        $fichaTecnica = '';
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
                        'fichaTecnica' => $fichaTecnica,
                        'imagenPrincipal' => $imagenPrincipal,
                        'sellos' => $sellos,
                        'imagenes' => $imagenes,
                        'ruta' => $producto['ruta'] ?? ''
                    ];
                    
                    if ($rutaParam !== '' && $producto['ruta'] === $rutaParam) break;
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