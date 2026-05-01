<?php

namespace App\Imports;

use App\Models\Pet;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Hash;

class PetImport implements ToModel
{
    public function model(array $row)
    {
        return new Pet([

            'name'  => $row[0],
            'image'  => $row[1],
            'kind'    => $row[2],
            'weight' => $row[3],
            'age'     => $row[4],
            'breed'     => $row[5],
            'location'  => $row[6],
            'description'  => $row[7],
            'active'  => $row[8],
            'status'  => $row[9],
        ]);
    }
}