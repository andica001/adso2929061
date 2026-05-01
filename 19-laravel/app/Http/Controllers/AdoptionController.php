<?php

namespace App\Http\Controllers;

use App\Models\Adoption;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\PDF;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AdoptionsExport;
use App\Imports\AdoptionsImport;

class AdoptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        #return "Hello";
        $adopts = Adoption::orderBy('id', 'desc')->paginate(12);
        return view('adoptions.index')->with('adopts', $adopts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return view('adoptions.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //
        $adopt =Adoption::find($request->id);
        #dd($request);
        return view('adoptions.show')->with('adopt',$adopt);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
        return view('users.edit')->with('user', $user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
        $validation = $request->validate([
            // All rules validation
            'document' => ['required', 'unique:' . User::class . ',document,' . $user->id],
            'fullname' => ['required', 'string'],
            'gender' => ['required'],
            'birthdate' => ['required', 'date'],
            'phone' => ['required'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class . ',email,' . $user->id],
        ]);

        if ($validation) {
            //dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'no-photo.png' && file_exists(public_path('images/' . $user->photo))) {
                    unlink(public_path('images/' . $user->photo));
                }
            } else {
                $photo = $request->originphoto;
            }
            // Save User
            $user->document = $request->document;
            $user->fullname = $request->fullname;
            $user->gender = $request->gender;
            $user->birthdate = $request->birthdate;
            $user->photo = $photo;
            $user->phone = $request->phone;
            $user->email = $request->email;

            if ($user->save()) {
                return redirect('users')->with('message', 'The User: ' . $user->fullname . 'was edited succesfully.');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
        if ($user->photo != 'no-photo.png' && file_exists(public_path('images/' . $user->photo))) {
            unlink(public_path('images/' . $user->photo));
        }
        if ($user->delete()) {
            return redirect('users')->with('message', 'The User: ' . $user->fullname . ' was deleted succesfully.');
        }
    }

    /**
     * Export a file to pdf
     * @return void
     */
    public function pdf()
    {
        $adopts = Adoption::all();
        $pdf = PDF::loadView('adoptions.pdf', compact('adopts'));
        return $pdf->download('alladoptions.pdf');
    }

    public function excel()
    {
        return Excel::download(new AdoptionsExport, 'alladoptions.xlsx');
    }

    public function import(Request $request){
        
    }

    /**
     * Search
     */

    Public function search(Request $request){
        $adopts = Adoption::names($request->q)->orderBy('id','desc')->paginate(12);
        return view('adoptions.search')->with('adopts',$adopts);
    }
}
