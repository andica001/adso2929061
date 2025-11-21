<?php
$title = '04 - Collaboration';
$description = 'Objects working together by calling each others methods.';

include_once 'template/header.php';
echo '<section>';

class Evolve {
    public function evolvePokemon($origin, $evolution){
        echo "<ul><li>$origin ➡️ $evolution </li></ul>";
    }
}

class pokemon{
    private $origin;
    private $evolution;
    private $collaboration;

    public function __construct($origin, $evolution){
        $this->origin=$origin;
        $this->evolution=$evolution;

        //Colaboration
        $this->collaboration=new Evolve;
    }

    public function next_level(){
        $this->collaboration->evolvePokemon($this->origin, $this->evolution);
    }
}

$pk1=new Pokemon('Pichu','Pikachu');
$pk1->next_level();
$pk1=new Pokemon('Pikachu','Raychu');
$pk1->next_level();


$pk2=new Pokemon('Squirtle','Wartortle');
$pk2->next_level();
$pk2=new Pokemon('Wartortle','Blastoise');
$pk2->next_level();

$pk3=new Pokemon('Bulbasaur','Ivysaur');
$pk3->next_level();
$pk3=new Pokemon('Ivisaur','Venusaur');
$pk3->next_level();

include_once 'template/footer.php';
