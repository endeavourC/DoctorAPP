<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function store(Request $request){

            /*
            * Validate data from request 
            */
            $validation = Validator::make($request->all(),[
                'image' => 'image|required|mimes:jpeg,png,jpg'
            ]);

            if($validation->fails()){
                return response()->json([
                    'response' => $validation->errors(),
                    'status' => 'error' 
                ], 200);
            }

            /*
            * Get image from request and store them
            */
            $image = request('image')->store('images', 'public');
            /*
            * Generate image thumbnail 
            */
            $imageThumbnail = request('image')->store('images/thumbnails', 'public');
            
            $imageThumbnail = Image::make(public_path("/storage/{$imageThumbnail}"))->resize(300,300);
            $imageThumbnail->save();

            return response()->json(['response' => $image ],200);
    }
}
