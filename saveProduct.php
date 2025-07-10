<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = ['success' => false, 'message' => ''];

try {
    // Verificar si es una edición
    $isEditing = isset($_POST['isEditing']) && $_POST['isEditing'] === 'true';
    $rutaOriginal = isset($_POST['rutaOriginal']) ? trim($_POST['rutaOriginal']) : null;

    // Validar campos requeridos
    $requiredFields = ['titulo', 'descripcion', 'unidadMedida', 'clasificacion', 'ventajas', 'aplicaciones', 'tipo', 'fechaCreacion', 'activo'];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Campo requerido faltante: $field");
        }
    }

    // Si es edición, usar el directorio original
    if ($isEditing && $rutaOriginal) {
        $baseDir = __DIR__ . '/' . $rutaOriginal;
        
        // Verificar si el directorio existe
        if (!is_dir($baseDir)) {
            throw new Exception("El directorio del producto no existe: $baseDir");
        }
    } else {
        // Si es nuevo producto, crear directorio con slug del título
        $productSlug = generarSlug($_POST['titulo']);
        $baseDir = __DIR__ . '/Productos/' . $productSlug;
        
        // Crear directorios solo para nuevo producto
        $dirs = [$baseDir, $baseDir . '/sellos', $baseDir . '/imagenes'];
        foreach ($dirs as $dir) {
            if (!is_dir($dir) && !mkdir($dir, 0777, true)) {
                throw new Exception("No se pudo crear directorio: $dir");
            }
        }
    }

    // Procesar archivos
    $fichaTecnicaBase64 = procesarArchivo($_FILES['fichaTecnica'] ?? [], $baseDir);
    $imagenPrincipalBase64 = procesarArchivo($_FILES['imagenPrincipal'] ?? [], $baseDir);
    $sellosBase64 = procesarArchivosArray($_FILES['sellos'] ?? [], $baseDir . '/sellos');
    $imagenesBase64 = procesarArchivosArray($_FILES['imagenes'] ?? [], $baseDir . '/imagenes');

    // Si es edición y no se subieron nuevos archivos, mantener los existentes
    if ($isEditing) {
        $existingData = json_decode(file_get_contents($baseDir . '/producto.json'), true);
        
        if (empty($fichaTecnicaBase64)) $fichaTecnicaBase64 = $existingData['fichaTecnica'] ?? '';
        if (empty($imagenPrincipalBase64)) $imagenPrincipalBase64 = $existingData['imagenPrincipal'] ?? '';
        if (empty($sellosBase64)) $sellosBase64 = $existingData['sellos'] ?? [];
        if (empty($imagenesBase64)) $imagenesBase64 = $existingData['imagenes'] ?? [];
    }

    // Preparar datos del producto
    $productData = [
        'titulo' => $_POST['titulo'],
        'descripcion' => $_POST['descripcion'],
        'unidadMedida' => $_POST['unidadMedida'],
        'clasificacion' => $_POST['clasificacion'],
        'ventajas' => $_POST['ventajas'],
        'aplicaciones' => $_POST['aplicaciones'],
        'tipo' => $_POST['tipo'],
        'activo' => filter_var($_POST['activo'], FILTER_VALIDATE_BOOLEAN),
        'fechaCreacion' => $_POST['fechaCreacion'],
        'fichaTecnica' => $fichaTecnicaBase64,
        'imagenPrincipal' => $imagenPrincipalBase64,
        'sellos' => $sellosBase64,
        'imagenes' => $imagenesBase64,
        'ruta' => str_replace(__DIR__ . '/', '', $baseDir)
    ];

    // Guardar en JSON (actualizar el existente en caso de edición)
    $jsonPath = $baseDir . '/producto.json';
    if (!file_put_contents($jsonPath, json_encode($productData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        throw new Exception('Error guardando JSON');
    }

    $response = [
        'success' => true,
        'message' => $isEditing ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente',
        'data' => $productData,
        'isEditing' => $isEditing
    ];

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);

// Funciones auxiliares
function generarSlug($text) {
    $text = preg_replace('/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ,.-]/u', '', $text);
    $text = preg_replace('/\s+/', '_', $text);
    $text = preg_replace('/_{2,}/', '_', $text);
    return strtolower($text);
}

function procesarArchivo($file, $destino) {
    if (!empty($file['tmp_name'])) {
        $fileName = preg_replace('/[^a-zA-Z0-9_\.]/', '_', $file['name']);
        $filePath = $destino . '/' . uniqid() . '_' . $fileName;
        
        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception("Error guardando archivo: " . $file['name']);
        }
        return base64_encode(file_get_contents($filePath));
    }
    return '';
}

function procesarArchivosArray($files, $destino) {
    $result = [];
    if (!empty($files['tmp_name'][0])) {
        foreach ($files['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $file = [
                    'name' => $files['name'][$index],
                    'tmp_name' => $tmpName
                ];
                $result[] = procesarArchivo($file, $destino);
            }
        }
    }
    return $result;
}
?>