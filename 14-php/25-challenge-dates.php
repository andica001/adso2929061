<?php 
    $title       = '25- Challenge Dates';
    $description = 'Calculate the age in years';

    include 'template/header.php';

    echo "<section>";


    echo "<h1>🎂 ¡Calcula tu Edad! 🎂</h1>";

    echo '
    <form method="POST" action="">
        <label for="fecha_nacimiento">Introduce tu Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required>
        <br><br>
        <button type="submit" name="calcular">Calcular Edad</button>
    </form>';
    

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['fecha_nacimiento'])) {
    $fechaNacimiento = $_POST['fecha_nacimiento'];
    if (empty($fechaNacimiento)) {
        echo "<p style='color: red;'>¡Ouch! Por favor, introduce una fecha válida.</p>";
    } else {
        try {
            $fecha_nac = new DateTime($fechaNacimiento);
            $hoy = new DateTime();
            $diferencia = $fecha_nac->diff($hoy);
            $edad = $diferencia->y;

            echo "<h2>🎉 ¡Tu Edad es... {$edad} años! 🎉</h2>";

        } catch (Exception $e) {
            echo "<p style='color: red;'>¡Houston, tenemos un problema! Error al procesar la fecha: " . $e->getMessage() . "</p>";
        }
    }
}
include 'template/footer.php';
?>
