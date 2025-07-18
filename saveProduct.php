<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = ['success' => false, 'message' => ''];

try {
    // 1. Validar campos obligatorios
    $requiredFields = [
        'titulo', 'descripcion', 'unidadMedida', 'clasificacion',
        'ventajas', 'aplicaciones', 'tipo', 'fechaCreacion', 'activo'
    ];
    foreach ($requiredFields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Campo requerido faltante: $field");
        }
    }

    // 2. Determinar si es edición o creación
    $isEditing    = filter_var($_POST['isEditing'] ?? false, FILTER_VALIDATE_BOOLEAN);
    $originalRuta = $_POST['originalRuta'] ?? null;

    // Cargar datos existentes si es edición
    $existingData = [];
    if ($isEditing && $originalRuta) {
        $existingJsonPath = __DIR__ . '/' . $originalRuta . '/' . basename($originalRuta) . '.json';
        if (file_exists($existingJsonPath)) {
            $existingData = json_decode(file_get_contents($existingJsonPath), true);
            if ($existingData === null) {
                throw new Exception("Error al cargar datos existentes");
            }
        }
    }

    // 3. Determinar ruta y slug
    if ($isEditing && $originalRuta) {
        $baseDir     = __DIR__ . '/' . trim($originalRuta, '/');
        $productSlug = basename($originalRuta);
    } else {
        $productSlug = preg_replace('/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ,.-]/u', '', $_POST['titulo']);
        $productSlug = preg_replace('/\s+/', '_', trim($productSlug));
        $productSlug = preg_replace('/_{2,}/', '_', $productSlug);
        $baseDir     = __DIR__ . '/Productos/' . $productSlug;
    }

    // 4. Crear directorios necesarios
    $dirs = [
        $baseDir,
        $baseDir . '/sellos',
        $baseDir . '/imagenes'
    ];
    foreach ($dirs as $dir) {
        if (!is_dir($dir) && !mkdir($dir, 0777, true)) {
            throw new Exception("No se pudo crear directorio: $dir");
        }
    }

    // 5. Función para procesar archivos
    function procesarArchivo($file, $destino) {
        if (!empty($file['tmp_name'])) {
            $safeName = preg_replace('/[^a-zA-Z0-9_\.]/', '_', $file['name']);
            $filePath = $destino . '/' . uniqid() . "_{$safeName}";
            if (!move_uploaded_file($file['tmp_name'], $filePath)) {
                throw new Exception("Error guardando archivo: " . $file['name']);
            }
            return base64_encode(file_get_contents($filePath));
        }
        return '';
    }

    // 6. Procesar archivos con manejo de edición
    // Ficha técnica
    $fichaTecnicaBase64 = $existingData['fichaTecnica'] ?? '';
    if (isset($_FILES['fichaTecnica']) && !empty($_FILES['fichaTecnica']['tmp_name'])) {
        $fichaTecnicaBase64 = procesarArchivo($_FILES['fichaTecnica'], $baseDir);
    } elseif (isset($_POST['delete_fichaTecnica']) && $_POST['delete_fichaTecnica'] === 'true') {
        $fichaTecnicaBase64 = '';
    }

    // Imagen principal
    $imagenPrincipalBase64 = $existingData['imagenPrincipal'] ?? '';
    if (isset($_FILES['imagenPrincipal']) && !empty($_FILES['imagenPrincipal']['tmp_name'])) {
        $imagenPrincipalBase64 = procesarArchivo($_FILES['imagenPrincipal'], $baseDir);
    } elseif (isset($_POST['delete_imagenPrincipal']) && $_POST['delete_imagenPrincipal'] === 'true') {
        $imagenPrincipalBase64 = '';
    }

    // Sellos
    $sellosBase64 = $existingData['sellos'] ?? [];
    $deleteSellos = $_POST['delete_sellos'] ?? [];
    foreach ($deleteSellos as $index) {
        if (isset($sellosBase64[$index])) {
            unset($sellosBase64[$index]);
        }
    }
    $sellosBase64 = array_values($sellosBase64); // re-index

    if (!empty($_FILES['sellos']['tmp_name'][0])) {
        foreach ($_FILES['sellos']['tmp_name'] as $i => $tmp) {
            $file = [
                'name'     => $_FILES['sellos']['name'][$i],
                'tmp_name' => $tmp
            ];
            $sellosBase64[] = procesarArchivo($file, $baseDir . '/sellos');
        }
    }

    // Imágenes
    $imagenesBase64 = $existingData['imagenes'] ?? [];
    $deleteImagenes = $_POST['delete_imagenes'] ?? [];
    foreach ($deleteImagenes as $index) {
        if (isset($imagenesBase64[$index])) {
            unset($imagenesBase64[$index]);
        }
    }
    $imagenesBase64 = array_values($imagenesBase64);

    if (!empty($_FILES['imagenes']['tmp_name'][0])) {
        foreach ($_FILES['imagenes']['tmp_name'] as $i => $tmp) {
            $file = [
                'name'     => $_FILES['imagenes']['name'][$i],
                'tmp_name' => $tmp
            ];
            $imagenesBase64[] = procesarArchivo($file, $baseDir . '/imagenes');
        }
    }

    // 7. Construir datos del producto
    $productData = [
        'titulo'          => $_POST['titulo'],
        'descripcion'     => $_POST['descripcion'],
        'unidadMedida'    => $_POST['unidadMedida'],
        'clasificacion'   => $_POST['clasificacion'],
        'ventajas'        => $_POST['ventajas'],
        'aplicaciones'    => $_POST['aplicaciones'],
        'tipo'            => $_POST['tipo'],
        'activo'          => filter_var($_POST['activo'], FILTER_VALIDATE_BOOLEAN),
        'fechaCreacion'   => $_POST['fechaCreacion'],
        'fichaTecnica'    => $fichaTecnicaBase64,
        'imagenPrincipal' => $imagenPrincipalBase64,
        'sellos'          => $sellosBase64,
        'imagenes'        => $imagenesBase64,
        'ruta'            => str_replace(__DIR__ . '/', '', $baseDir),
    ];

    // 8. Guardar JSON
    $jsonPath = $baseDir . '/' . $productSlug . '.json';
    if (!file_put_contents($jsonPath,
        json_encode($productData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
    )) {
        throw new Exception('Error guardando JSON');
    }

    // 9. Respuesta exitosa
    $response = [
        'success' => true,
        'message' => $isEditing
            ? 'Producto actualizado exitosamente'
            : 'Producto guardado exitosamente',
        'data'    => [
            'ruta' => $productData['ruta'],
            'json' => str_replace(__DIR__ . '/', '', $jsonPath)
        ]
    ];

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
