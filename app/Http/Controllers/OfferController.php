<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Offer;
use App\User;
use Validator;
class OfferController extends Controller
{
    public function index(){

        return response()->json(['offers' => Offer::get() ] , 200);

    }

    public function getOffersByUserId(int $id){

        return response()->json(['offers' => User::findOrFail($id)->offers()->get() ] , 200);
    }

    public function show(int $id){

        return response()->json(['offers' => Offer::findOrFail($id) ] ,200);

    }

    public function store(Request $request){
        // store
        $validation = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'city' => 'required',
            'image' => 'required',
        ]);

        if( $validation->fails() ){
            return response()->json( [
                'error' => $validation->errors(),
                'status' => 'error',
            ] , 401);
        }

        auth()->user()->offers()->create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'city' => $request->city,
            'image' => $request->image
        ]);

        return response()->json([
             'response' => 'Offer has been created succesly!',
             'status' => 'success'
         ] ,200);
    }

    public function edit(int $id){

        return response()->json([ 'offers' => Offer::findOrFail($id) ], 200);
    }

    public function update(int $id){
        // Update
    }

    public function destroy(int $id){

        // delete
    }
    
}
