<?php
    abstract class DataBase{
        protected static $conn=null; 

        public static function connect(){
            if(self::$conn === null){
                try {
                    $host = 'localhost';
                    $dbnm = 'pokeadso';
                    $user = 'root';
                    $pass = '';

                    self::$conn = new PDO("mysql:host=$host;dbname=$dbnm", $user, $pass);
                } catch (PDOException $e) {
                    die('Connection Error: ' . $e->getMessage());
                }
                return self::$conn;
            }
        }
    }