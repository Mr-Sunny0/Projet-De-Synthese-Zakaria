<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalController extends Controller
{
    public function index(){
        return response()->json(Goal::all());  /// returns the Goal table to the front end
    }
    public function store(request $request){
        Goal::create([
            "price" => $request->price ,
            "months" => $request->months ,
            // "category"=> $request->category ,
            "date" => $request->date ,
            "user_id" => auth()->id() , //this will determine the user id based on the provided token 
         ]);
    }

}
