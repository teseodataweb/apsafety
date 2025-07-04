<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
$response = ['success' => false, 'message' => ''];
try {
    $requiredFields = [
        'titulo', 'descripcion', 'unidadMedida', 'clasificacion', 
        'ventajas', 'aplicaciones', 'tipo', 'fechaCreacion', 'activo'
    ];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Campo requerido faltante: $field");
        }
    }
    $productSlug = preg_replace('/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ,.-]/u', '', $_POST['titulo']);
    $productSlug = preg_replace('/_{2,}/', '_', $productSlug);
    $baseDir = __DIR__ . '/Productos/' . $productSlug;

    $dirs = [
        $baseDir,
        $baseDir . '/sellos',
        $baseDir . '/imagenes'
    ];
    foreach ($dirs as $dir) {
        if (!is_dir($dir)) {
            if (!mkdir($dir, 0777, true)) {
                throw new Exception("No se pudo crear directorio: $dir");
            }
        }
    }
    function procesarArchivo($file, $destino) {
        if (!empty($file)) {
            $filePath = $destino . '/' . uniqid() . '_' . preg_replace('/[^a-zA-Z0-9_\.]/', '_', $file['name']);
            if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                throw new Exception("Error guardando archivo: " . $file['name']);
            }
            return base64_encode(file_get_contents($filePath));
        }
        return '';
    }
    $fichaTecnicaBase64 = '';
    if (!empty($_FILES['fichaTecnica']['tmp_name'])) {
        $fichaTecnicaBase64 = procesarArchivo($_FILES['fichaTecnica'], $baseDir);
    }
    $imagenPrincipalBase64 = '';
    if (!empty($_FILES['imagenPrincipal']['tmp_name'])) {
        $imagenPrincipalBase64 = procesarArchivo($_FILES['imagenPrincipal'], $baseDir);
    }
    $sellosBase64 = [];
    if (!empty($_FILES['sellos']['tmp_name'][0])) {
        foreach ($_FILES['sellos']['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $file = [
                    'name' => $_FILES['sellos']['name'][$index],
                    'type' => $_FILES['sellos']['type'][$index],
                    'tmp_name' => $tmpName,
                    'error' => $_FILES['sellos']['error'][$index],
                    'size' => $_FILES['sellos']['size'][$index]
                ];
                $sellosBase64[] = procesarArchivo($file, $baseDir . '/sellos');
            }
        }
    }
    $imagenesBase64 = [];
    if (!empty($_FILES['imagenes']['tmp_name'][0])) {
        foreach ($_FILES['imagenes']['tmp_name'] as $index => $tmpName) {
            if (!empty($tmpName)) {
                $file = [
                    'name' => $_FILES['imagenes']['name'][$index],
                    'type' => $_FILES['imagenes']['type'][$index],
                    'tmp_name' => $tmpName,
                    'error' => $_FILES['imagenes']['error'][$index],
                    'size' => $_FILES['imagenes']['size'][$index]
                ];
                $imagenesBase64[] = procesarArchivo($file, $baseDir . '/imagenes');
            }
        }
    }
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
        'ruta' => "Productos/$productSlug"
    ];
    $jsonPath = $baseDir . '/' . $productSlug . '.json';
    if (!file_put_contents($jsonPath, json_encode($productData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        throw new Exception('Error guardando JSON');
    }

    $response = [
        'success' => true,
        'message' => 'Producto guardado exitosamente',
        'data' => [
            'ruta' => $baseDir,
            'json' => $jsonPath
        ]
    ];

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}
echo json_encode($response);
?>