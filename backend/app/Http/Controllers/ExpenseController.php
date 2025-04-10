<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(){
        return response()->json(Expense::all());  /// returns the expense table to the front end
    }
    public function store(request $request){
        Expense::create([
            "name" => $request->name ,
            "amount" => $request->amount ,
            "category"=> $request->category ,
            "date" => $request->date ,
            "user_id" => auth()->id() , //this will determine the user id based on the provided token 
         ]);
    }
}
