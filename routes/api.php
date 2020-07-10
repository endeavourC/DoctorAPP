<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('/user')->group(function(){
    Route::middleware('auth:api')->get('/', 'UserController@getUserData');
    Route::post('/login', 'UserController@login');
    Route::post('/register', 'UserController@register');
    Route::middleware('auth:api')->get('/current', 'UserController@current');
    Route::middleware('auth:api')->post('/logout', 'UserController@logout');
});

Route::prefix('/offers')->group(function(){
    // Get offer
    Route::get('/', 'OfferController@index');

    // Get offers by user id
    Route::get('/user/{user_id}', 'OfferController@getOffersByUserId');

    //Get single offer 
    Route::get('/{offer_id}', 'OfferController@show');

    // Add offer
    Route::middleware('auth:api')->post('/', 'OfferController@store');

    //Edit offer
    Route::middleware('auth:api')->get('/{offer_id}/edit', 'OfferController@edit');
    Route::middleware('auth:api')->put('/{offer_id}', 'OfferController@update');
    
    //Delete offer
    Route::middleware('auth:api')->delete('/{offer_id}', 'OfferController@destroy');
});

Route::prefix('/images')->group(function(){

    Route::middleware('auth:api')->post('/', 'ImageUploadController@store');

});