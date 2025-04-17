<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalController extends Controller
{
    public function index(){
        $user = auth()->user(); // This comes from the Sanctum token
        return Goal::where('user_id', $user->id)->get();
        // return response()->json(Goal::all());  /// returns the Goal table to the front end
    }
    public function store(request $request){
        Goal::create([
            "price" => $request->price ,
            "months" => $request->months ,
             "name" => $request->name ,
            // "category"=> $request->category ,
            "monthly_target" =>$request->monthly_target,
            "date" => $request->date ,
            "user_id" => auth()->id() , //this will determine the user id based on the provided token 
         ]);
    }
    public function destroy(request $request){
        Goal::destroy($request->id) ;
     } 
}
