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
        Expense::create($request->all());    /// stores data in the expense table
    }
}
