<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;

class PetController extends Controller
{
    public function index()
    {
        $pets = Pet::all();
        return response()->json([
            'message' => '✅ Query success',
            'Pets' => $pets
        ]);
    }

    public function show($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => '❌ Pet not found'
            ], 404);
        }

        return response()->json([
            'message' => '✅ Query success',
            'Pet' => $pet
        ]);
    }

    public function store(Request $request) {}
    public function update(Request $request, $id) {}

    public function destroy($id)
    {
        $pet = Pet::find($id);

        if (!$pet) {
            return response()->json([
                'message' => '❌ Pet not found'
            ], 404);
        }

        $pet->delete();

        return response()->json([
            'message' => '✅ Pet deleted successfully'
        ]);
    }
}
