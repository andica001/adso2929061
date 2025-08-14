<?php
// Connection Data Base
try {
    $conx = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

// Login
function login($email, $pass, $conx)
{
    try {
        $sql = "SELECT *
                    FROM users
                    WHERE email = :email
                    LIMIT 1";
        $stmt = $conx->prepare($sql);
        $stmt->bindparam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $usr = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($pass, $usr['password'])) {
                $_SESSION['uid'] = $usr['id'];
                return true;
            } else {
                $_SESSION['error'] = "El password es incorrecto!";
                return false;
            }
        } else {
            $_SESSION['error'] = "El usuario no esta registrado!";
            return false;
        }
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

//list pets
function listPets($conx)
{
    try {
        $sql = "SELECT p.id AS id,
                            p.name AS name,
                            p.photo AS photo,
                            s.name AS specie,
                            b.name AS breed
                    FROM pets AS p,
                        species AS s,
                        breeds AS b
                    WHERE s.id = p.specie_id
                    AND b.id = p.breed_id";
        $stmt = $conx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

function listSpecies($conx)
{
    try {
        $sql = "SELECT * FROM species";
        $stmt = $conx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// Breeds

function listBreeds($conx)
{
    try {
        $sql = "SELECT * FROM breeds";
        $stmt = $conx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

// Sexes

function listSexes($conx)
{
    try {
        $sql = "SELECT * FROM sexes";
        $stmt = $conx->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

function addPet($name, $specie_id, $breed_id, $sex_id, $photo, $conx)
{
    try {
        $sql = "INSERT INTO pets (name, specie_id, breed_id, sex_id, photo) VALUES (:name, :specie_id, :breed_id, :sex_id, :photo)";
        $stmt = $conx->prepare($sql);
        $stmt->bindparam(':name', $name);
        $stmt->bindparam(':specie_id', $specie_id);
        $stmt->bindparam(':breed_id',$breed_id);
        $stmt->bindparam(':sex_id', $sex_id);
        $stmt->bindparam(':photo',$photo);
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    } catch (PDOException $e) {
        echo 'Error: '. $e->getMessage();
    }
}

?>