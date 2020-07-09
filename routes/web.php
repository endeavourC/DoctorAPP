<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::view('/{path?}', 'app');

Route::get('{reactRoutes}', function () {
    return view('app'); // your start view
})->where('reactRoutes', '^((?!api).)*$'); // except 'api' word

Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');
