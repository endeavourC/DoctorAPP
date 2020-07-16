<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Pagination\Paginator;
use App\Offer;
use App\User;
use App\Http\Resources\Offer as OfferResource;
use Validator;

class OfferController extends Controller
{
    public function index(Request $request){

        /**
         * Set how many pages can be on 1 page.
         */
        $pageLimit = 5;

        /**
         * Get all of offers count.
         */

        $getOffersCount = Offer::all()->count();

        /**
         * Get the paginations pages length
         */

        $page = ceil( $getOffersCount / $pageLimit );

        /**
        * Get current page number 
        */
        $pageNumber = $request->query('page', 1);


        $offers = OfferResource::collection(Offer::with('user')->paginate($pageLimit));
   
        return response()->json(['offers' => $offers, 'pages_count' =>  $page, 'current_page' => $pageNumber ] , 200);



    }

    public function getOffersByUserId(int $offerID){

        return response()->json(['offers' => User::findOrFail($offerID)->offers()->get() ] , 200);
    }

    public function show(int $offerID){

        return response()->json(['offers' => Offer::findOrFail($offerID) ] ,200);

    }

    public function store(Request $request){
        // store
        $validation = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'city' => 'required',
            'image' => 'required',
            'image_thumbnail' => 'required'
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
            'image_thumbnail' => $request->image_thumbnail,
            'image' => $request->image,
            'price' => $request->price,
            'city' => $request->city,
        ]);

        return response()->json([
             'response' => 'Offer has been created succesly!',
             'status' => 'success'
         ] ,200);
    }

    public function edit(int $offerID){

        // Check if current user can edit this offer 

        $offer = auth()->user()->offers()->findOrFail($offerID);


        return response()->json([ 'offers' => $offer ], 200);
    }

    public function update(int $offerID, Request $request){

        auth()->user()->offers()->findOrFail($offerID)->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'city' => $request->city,
            'image' => $request->image,
            'image_thumbnail' => $request->image_thumbnail,
        ]);

        return response()->json(['status' => 'success'] , 200);

    }


    public function destroy(int $offerID){

        auth()->user()->offers()->where('id', $offerID)->delete();

        return response()->json(['status' => "success"],200);
        // delete
    }
    
}
