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
        Goal::create($request->all());    /// stores data in the Goal table
    }

}
