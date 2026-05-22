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

    public function store(Request $request)
    {
        try {
            $validation = $request->validate([
                // All rules validation
                'name' => ['required', 'string'],
                'kind' => ['required', 'string'],
                'weight' => ['required', 'numeric'],
                'age' => ['required', 'integer'],
                'breed' => ['required', 'string'],
                'location' => ['required', 'string'],
                'description' => ['required', 'string'],
                'active' => ['required', 'integer'],
                'status' => ['required', 'integer']
            ]);

            if ($validation) {
                $photo = 'no-image.png';
                // Save Pet
                $pet = new Pet;
                $pet->name = $request->name;
                $pet->image = $photo;
                $pet->kind = $request->kind;
                $pet->weight = $request->weight;
                $pet->age = $request->age;
                $pet->breed = $request->breed;
                $pet->location = $request->location;
                $pet->description = $request->description;
                $pet->active = $request->active;
                $pet->status = $request->status;

                if ($pet->save()) {
                    return response()->json([
                        'message' => '✅ Pet created successfully',
                        'Pet' => $pet
                    ], 201); // 201 significa "Creado"
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => '❌ Error creating pet',
                'error' => $e->getMessage()
            ], 400); // 400 significa "Bad Request"
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $pet = Pet::find($id);


            //
            $validation = $request->validate([
                // All rules validation
                'name' => ['sometimes', 'required', 'string'],
                'kind' => ['sometimes','required', 'string'],
                'weight' => ['sometimes','required', 'numeric'],
                'age' => ['sometimes','required', 'integer'],
                'breed' => ['sometimes','required', 'string'],
                'location' => ['sometimes','required', 'string'],
                'description' => ['sometimes','required', 'string'],
                'active' => ['sometimes','required', 'integer'],
                'status' => ['sometimes','required', 'integer']
            ]);

            if ($validation) {
                // Save Pet
                $pet->update($request->all());

                if ($pet->save()) {
                    return response()->json([
                        'message' => '✅ Pet updated successfully',
                        'Pet' => $pet
                    ]);
                }
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => '❌ Error updating pet',
                'error' => $e->getMessage()
            ], 400); // 400 significa "Bad Request"
        }
    }

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
