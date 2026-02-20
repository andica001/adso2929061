<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('helloworld',function(){
    return '<h1>Hellos World :) </h1>';
});
Route::get('sayhello/{name}',function(){
    $say = '';
    return '<h1>👍 Hello: ' . request()->name . '</h1>';
});
Route::get('getallpets',function(){
    $pets = App\Models\Pet::take(10)->get();
    dd($pets->toArray());
});
Route::get('show/pet/{id}',function(){
    $pet = App\Models\Pet::find(request()->id);
    dd($pet->toArray());
});

Route::get('challenge',function(){
    $users = App\Models\User::take(20)->get();
    echo '<table style="border: 1px solid"> 
            <tr style="border: 1px solid">
                <td style="border: 1px solid">nombre</td>
                <td style="border: 1px solid">Correo</td>
                <td style="border: 1px solid">Telefono</td>
                <td style="border: 1px solid">Edad</td>
                <td style="border: 1px solid">Creado</td>
                <td style="border: 1px solid">photo</td>
            </tr>';
    foreach ($users as $user) {
        echo '<tr style="border: 1px solid">';
        $name=$user->fullname;
        $mail=$user->email;
        $phone=$user->phone;
        $edad = Carbon::parse($user->birthdate)->age;
        $created=Carbon::parse($user->createdat)->week;
        $photo=public_path("images/{$user->photo}");
        echo '<td style="border: 1px solid">'. $name .' </td>
                <td style="border: 1px solid">'. $mail .'</td>
                <td style="border: 1px solid">'. $phone .'</td>
                <td style="border: 1px solid">'. $edad .' años </td>
                <td style="border: 1px solid">' . $created . ' days </td>
                <td style="border: 1px solid"><img style="width:100px, height:100px" src="' . $photo . '"></td>
            </tr>';
    }
    echo '</table>';
});