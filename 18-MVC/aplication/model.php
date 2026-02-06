<?php
class Model extends Database
{
    protected $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function listPokemons()
    {
        $stmt =  $this->db->query("SELECT * FROM pokemons");
        return $stmt->fetchAll();
    }

    public function viewPokemon($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM pokemons WHERE id = ?");
        if ($stmt->execute([$id])) {
            return $stmt->fetch();
        }
        return false;
    }

    public function showPokemon($id)
    {
        $stmt = $this->db->prepare("SELECT p.*, t.name as tname FROM pokemons p, trainers t WHERE p.id = ? and p.trainer_id=t.id");
        if ($stmt->execute([$id])) {
            return $stmt->fetch();
        }
        return false;
    }

    public function listTrainers(){
        $stmt =  $this->db->query("SELECT * FROM trainers");
        return $stmt->fetchAll();
    }

    public function editPokemon($id, $name, $type, $strenght, $stamina, $speed, $accuracy, $trainer_id)
    {
        $stmt = $this->db->prepare("UPDATE pokemons SET name=?, type=?, strenght=?, stamina=?, speed=?, accuracy=?, trainer_id=?  WHERE id = ?");
        return $stmt->execute([$name, $type, $strenght, $stamina, $speed, $accuracy, $trainer_id, $id]);

    }


}
