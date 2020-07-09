<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Offer;
use App\User;

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

        $data = request()->all();

        return response()->json([ 'response' => $data ] ,200);
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
