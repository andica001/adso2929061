<?php
class Controller
{
    public $load;
    public $model;

    public function __construct()
    {
        $this->load = new Load;
        $this->model = new Model;

        $this->handleRequest();
    }

    private function handleRequest()
    {
        $request_uri = $_SERVER['REQUEST_URI'];
        $path = parse_url($request_uri, PHP_URL_PATH);
        $path = trim($path, '/');
        $segments = explode('/', $path);
        switch ($segments[0]) {
            case 'show':
                $pokemon = $this->model->showPokemon($segments[1]);
                $this->load->view('show.php', $pokemon);
                break;
            case 'edit':
                $pokemon = $this->model->viewPokemon($segments[1]);
                $trainers = $this->model->listTrainers();
                $data=[
                    'pokemon'=> $pokemon,
                    'trainers'=> $trainers
                ];
                $this->load->view('edit.php', $data);
                break;
            case 'update':
                $id=$_POST['id'];
                $name= $_POST['name'];
                $type= $_POST['type'];
                $strenght= $_POST['strenght'];
                $stamina= $_POST['stamina'];
                $speed= $_POST['speed'];
                $accuracy= $_POST['accuracy'];
                $trainer_id= $_POST['trainer_id'];
                $this->model->editPokemon($id,$name, $type, $strenght, $stamina, $speed, $accuracy, $trainer_id);
                header('location: /');
                break;
            case 'delete':
                echo 'Elimine el pokemon';
                $pokemon = $this->model->viewPokemon($segments[1]);
                $this->load->view('viewPokemon.php', $pokemon);
                break;
            default:
                $pokemons = $this->model->listPokemons();
                $this->load->view('welcome.php', $pokemons);
                break;
        }
    }
}
