<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index(){
        $user = auth()->user(); // This comes from the Sanctum token
        return Expense::where('user_id', $user->id)->get();
        // return response()->json(Expense::all());  /// returns the expense table to the front end
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
    public function destroy(request $request){
        Expense::destroy($request->id) ;
     }
    public function update (request $request){
        $row = Expense::find($request->id) ;
        $row->update([
            "name" => $request->name ,
            "amount" => $request->amount ,
            "category"=> $request->category ,
            "date" => $request->date 
        ]
        );
    }

}
