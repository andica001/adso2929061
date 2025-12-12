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
                echo 'Ingrese al switch';
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
