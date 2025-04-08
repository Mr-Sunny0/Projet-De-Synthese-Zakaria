<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("Expenses" , function(blueprint $table){
            $table->id() ;               //Expense id 
            $table->string("name");      //Expense name 
            $table->Integer("amount");   //Expense amount 
            $table->string("category");  //Expense category
            $table->date("date")->default(now());  //Expense add date 
            $table->foreignid("user_id")->constrained()->onDelete("cascade"); // foreign key linking to this Expense to the users table
            $table->timestamps(); // 👈 THIS adds created_at and updated_at

        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropifexists("Expenses");
    }
};
