<?php 
$title = '03 - pPivate';
$description = 'Restricts property or method access to only within its class.';

include_once 'template/header.php';
echo '<section>';

class RenderTable {
    private $nr; // numero de filas
    private $nc; // numero de columnas

public function __construct($nr,$nc){
    $this->nr = $nr;
    $this->nc = $nc;

    //acceso metodos privados
    $this->renderTableHeader();
    $this->renderTableBody();
    $this->renderTableFooter();
}
private function renderTableHeader(){
    echo "<h3>Table ($this->nr X $this->nc)</h3>";
    echo "<table>";
}
private function renderTableBody(){
for ($r=1; $r <= $this->nr; $r++){
    echo "<tr>";
    for($c=0; $c < $this->nc; $c++){
        echo "<td>F:$r C:$c</td>";
    }
    echo "</tr>";
}
}

private function renderTableFooter(){
    echo "</table><br>";
}

}
$rt = new RenderTable (5,5);
$rt = new RenderTable (3,3);
$rt = new RenderTable (8,8);



include_once 'template/footer.php';