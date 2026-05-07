<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Pet;
use App\Models\Adoption;

use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function myprofile(){
        $user = User::find(Auth::user()->id);
        //dd($user->toArray());
        return view('customer.myprofile')->with('user',$user);
    }
    public function updatemyprofile(Request $request)
    {
        //
        $validation = $request->validate([
            // All rules validation
            'document' => ['required', 'unique:' . User::class . ',document,' . $request->id],
            'fullname' => ['required', 'string'],
            'gender' => ['required'],
            'birthdate' => ['required', 'date'],
            'phone' => ['required'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class . ',email,' . $request->id],
        ]);

        
        if ($validation) {
            //dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
                if ($request->originphoto != 'no-photo.png' && file_exists(public_path('images/' . $request->photo))) {
                    unlink(public_path('images/' . $request->originphoto));
                }
            } else {
                $photo = $request->originphoto;
            }
            
            $user = User::find($request->id);
            // Save User
            $user->document = $request->document;
            $user->fullname = $request->fullname;
            $user->gender = $request->gender;
            $user->birthdate = $request->birthdate;
            $user->photo = $photo;
            $user->phone = $request->phone;
            $user->email = $request->email;

            if ($user->save()) {
                return redirect('dashboard')->with('message', 'The profile was edited succesfully.');
            }
        }
    }

    public function myadoptions(){
        $adoptions = Adoption::where('user_id', Auth::user()->id)->orderBy('id', 'desc')->get();
        //dd($adoptions->toArray());
        return view('customer.myadoptions')->with('adoptions', $adoptions);
    }

    public function showmyadoption(Request $request){
        $adoption = Adoption::find($request->id);
        //dd($adoption->toArray());
        return view('customer.showmyadoption')->with('adopt', $adoption);
    }

        Public function search(Request $request){
        $adopts = Adoption::names($request->q)->orderBy('id','desc')->paginate(12);
        return view('adoptions.search')->with('adopts',$adopts);
    }

    public function searchpets(Request $request){
        $pets = Pet::names($request->q)->orderBy('id','desc')->paginate(12);
        return view('customer.searchpets')->with('pets',$pets);
    }

    public function listpets()
    {
        $pets = Pet::where('status', 0)->orderBy('id', 'desc')->paginate(12);
        return view('customer.listpets')->with('pets', $pets);
    }

    public function showpet(Request $request)
    {
        $pet = Pet::find($request->id);
        return view('customer.showpet')->with('pet', $pet);
    }

    public function makeadoption(Request $request)
    {
        $count = Adoption::where('user_id', Auth::user()->id)->count();
        if ($count < 4) {
            
            $pet_id = Pet::find($request->pet_id);
            $adoption = new Adoption();
            $adoption->user_id = Auth::user()->id;
            $adoption->pet_id = $pet_id->id;
            if ($adoption->save()) {
                $pet_id->status = 1;
                $pet_id->save();
                return redirect('myadoptions')->with('message', 'The adoption was made succesfully.');
            }
        }else{
            return redirect('myadoptions')->with('error', 'You have reached the maximum number of adoptions allowed (4).');
        }
    }
}