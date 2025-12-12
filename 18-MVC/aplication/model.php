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
}
