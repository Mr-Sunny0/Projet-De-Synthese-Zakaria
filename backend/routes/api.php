<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\IncomeController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\Auth\AuthenticatedSessionController; //these two added by breeze
use App\Http\Controllers\Auth\RegisteredUserController;       //these two added by breeze
Route::post('/register', [RegisteredUserController::class, 'store']);         //breeze auth routes 
Route::post('/login', [AuthenticatedSessionController::class, 'store']);      //breeze auth routes
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])    //breeze auth routes
    ->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//routes for incomes
// Route::get('/GetIncome', [IncomeController::class , "index"]);  // will send a json to http://127.0.0.1:8000/api/GetIncome
// Route::post('/PostIncome', [IncomeController::class , "store"]); // will recieve a json and store in the database 
// //routes for Expenses
// Route::get('/GetExpense', [ExpenseController::class , "index"]);  // will send a json to http://127.0.0.1:8000/api/GetExpense
// Route::post('/PostExpense', [ExpenseController::class , "store"]); // will recieve a json and store in the database 
// //routes for Goals
// Route::get('/GetGoal', [GoalController::class , "index"]);  // will send a json to http://127.0.0.1:8000/api/GetGoal
// Route::post('/PostGoal', [GoalController::class , "store"]); // will recieve a json and store in the database 

Route::middleware('auth:sanctum')->group(function () {
    ////Income routes
    Route::post('/PostIncome', [IncomeController::class , "store"]);
    Route::get('/GetIncome', [IncomeController::class , "index"]);
    Route::delete('/DeleteIncome/{id}' , [IncomeController::class , "destroy"]);
    Route::put('UpdateIncome/{id}' ,[IncomeController::class , "update"] ) ;
    ///Expense routes 
    Route::get('/GetExpense', [ExpenseController::class , "index"]);  
    Route::post('/PostExpense', [ExpenseController::class , "store"]);
    Route::delete('/DeleteExpense/{id}', [ExpenseController::class , "destroy"]);  
    Route::put('/UpdateExpense/{id}', [ExpenseController::class , "update"]);
    ///Goal routes
    Route::get('/GetGoal', [GoalController::class , "index"]);
    Route::post('/PostGoal', [GoalController::class , "store"]);
    Route::delete('/DeleteGoal/{id}', [GoalController::class , "destroy"]);

});
