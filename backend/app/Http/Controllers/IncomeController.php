<?php

namespace App\Http\Controllers;

use App\Models\Income;
use Illuminate\Http\Request;

class IncomeController extends Controller
{
    public function index(){
        return response()->json(Income::all());  /// returns the Income table to the front end
    }
    public function store(request $request){
        // Income::create($request->all());    /// stores data in the Income table
        //above is outdated since it will not fill the foreign key column to determine wich user
        //and we cannot send the user id since its not safe as users can send to other users accounts
         Income::create([
            "name" => $request->name ,
            "amount" => $request->amount ,
            "category"=> $request->category ,
            "date" => $request->date ,
            "user_id" => auth()->id() , //this will determine the user id based on the provided token 
         ]);
    }

}
