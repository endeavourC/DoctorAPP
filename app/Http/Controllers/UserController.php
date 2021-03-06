<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    // login API
    public function login(Request $request){
        if($request->isMethod('post')){

            if( Auth::attempt( [ 'email' => request('email') , 'password' => request('password') ] ) ){
                $user = Auth::user();
                $success['token'] = $user->createToken('doctorapp_auth')->accessToken;
                
                return response()->json( ['success' => $success ] , 200 ); 
            } else {
                return response()->json( ['error' => ['password' => 'Invalid email or password'] ], 401 );
            }

        }
    }

    // Current User

    public function current(){

        return response()->json(['status'=> Auth::user()->getID() ] ,200);

    }


    public function getUserData(){

        return response()->json(['data' => Auth::user() ], 200);

    }

    // Register API
    public function register(Request $request){

        if($request->isMethod('post')){

            $validator = Validator::make($request->all(), [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required',
                'c_password' => 'required|same:password',
            ]);
    
            if( $validator->fails() ) {
                return response()->json( ['error' => $validator->errors() ] , 401);
            }
    
            // Hash password
            $data = $request->all();
            $data['password'] = bcrypt($data['password']);
    
            // Creating User
            $user = User::create($data);

            $success['token'] = $user->createToken('doctorapp_auth')->accessToken;
    
            return response()->json([ 'success' => $success ] , 200);
        };

    }

    public function logout(){
        auth()->user()->token()->delete();

        return response()->json([ 'success' => 'Succesly logout.' ] , 200);
    }


}
