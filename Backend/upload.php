<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite solicitudes desde cualquier origen

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtiene los datos del formulario en formato JSON
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica si los datos fueron recibidos correctamente
    if ($data) {
        $productName = $data['titulo'];
        $productFolder = 'Productos/' . $productName;
        
        // Crea la carpeta del producto si no existe
        if (!file_exists($productFolder)) {
            mkdir($productFolder, 0777, true);
        }

        // Guarda el archivo JSON con los datos del producto
        file_put_contents($productFolder . '/data.json', json_encode($data, JSON_PRETTY_PRINT));

        // Guarda las imágenes de los sellos
        if (isset($data['sellos']) && is_array($data['sellos'])) {
            $sellosFolder = $productFolder . '/sellos';
            if (!file_exists($sellosFolder)) {
                mkdir($sellosFolder, 0777, true);
            }

            foreach ($data['sellos'] as $index => $selloBase64) {
                $imageData = base64_decode(explode(',', $selloBase64)[1]);
                file_put_contents($sellosFolder . "/sello" . ($index + 1) . ".png", $imageData);
            }
        }

        // Guarda las imágenes principales
        if (isset($data['imagenPrincipalUrl']) && !empty($data['imagenPrincipalUrl'])) {
            $imageData = base64_decode(explode(',', $data['imagenPrincipalUrl'])[1]);
            file_put_contents($productFolder . '/imagenPrincipal.png', $imageData);
        }

        // Guarda las imágenes adicionales
        if (isset($data['imagenesUrl']) && is_array($data['imagenesUrl'])) {
            $imagenesFolder = $productFolder . '/imagenes';
            if (!file_exists($imagenesFolder)) {
                mkdir($imagenesFolder, 0777, true);
            }

            foreach ($data['imagenesUrl'] as $index => $imageBase64) {
                $imageData = base64_decode(explode(',', $imageBase64)[1]);
                file_put_contents($imagenesFolder . "/imagen" . ($index + 1) . ".png", $imageData);
            }
        }

        // Guarda el archivo PDF de la ficha técnica
        if (isset($data['fichaTecnicaUrl']) && !empty($data['fichaTecnicaUrl'])) {
            $pdfData = base64_decode(explode(',', $data['fichaTecnicaUrl'])[1]);
            file_put_contents($productFolder . '/fichaTecnica.pdf', $pdfData);
        }

        echo json_encode(['success' => true, 'message' => 'Producto guardado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al procesar los datos']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
