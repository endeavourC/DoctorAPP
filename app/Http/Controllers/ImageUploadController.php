<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function store(Request $request){
        // $path = $request->photo->path();

        return response()->json(['response' => 'test' ], 200);
    }
}
