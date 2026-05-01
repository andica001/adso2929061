<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PetsExport;
use App\Imports\PetsImport;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $pets = Pet::orderBy('id', 'desc')->paginate(12);
        return view('pets.index')->with('pets', $pets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('pets.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validation = $request->validate([
            // All rules validation
            'name' => ['required', 'string'],
            'photo' => [ 'image'],
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
            //dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
            }else{
                $photo='no-image.png';
            }
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
                return redirect('pets')->with('message', 'The Pet: ' . $pet->name . 'was added succesfully.');
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        //
        return view('pets.show')->with('pet', $pet);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pet $pet)
    {
        //
        return view('pets.edit')->with('pet', $pet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet)
    {
        //
        $validation = $request->validate([
            // All rules validation
            'name' => ['required', 'string'],
            'photo' => ['image'],
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
            //dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'no-image.png' && file_exists(public_path('images/' . $pet->image))) {
                    unlink(public_path('images/' . $pet->image));
                }
            } else {
                $photo = $request->originphoto;
            }
            // Save Pet
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
                return redirect('pets')->with('message', 'The Pet: ' . $pet->name . 'was edited succesfully.');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        //
        if ($pet->image != 'no-image.png' && file_exists(public_path('images/' . $pet->image))) {
            unlink(public_path('images/' . $pet->image));
        }
        if ($pet->delete()) {
            return redirect('pets')->with('message', 'The Pet: ' . $pet->name . ' was deleted succesfully.');
        }
    }

    /**
     * Export a file to pdf
     * @return void
     */
    public function pdf()
    {
        $pets = PET::all();
        $pdf = PDF::loadView('pets.pdf', compact('pets'));
        return $pdf->download('allpets.pdf');
    }

    public function excel()
    {
        return Excel::download(new PetsExport, 'allpets.xlsx');
    }

    public function import(Request $request)
    {
        $file = $request->file('file');
        Excel::import(new PetsImport, $file);
        return redirect()->back()->with('message', 'Pets imported succesfsful!');
    }

    /**
     * Search
     */

    public function search(Request $request)
    {
        $pets = Pet::names($request->q)->orderBy('id', 'desc')->paginate(12);
        return view('pets.search')->with('pets', $pets);
    }
}