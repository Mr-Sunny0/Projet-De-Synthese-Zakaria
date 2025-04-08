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
        Schema::create("Incomes" , function(blueprint $table){
            $table->id() ;               //income id 
            $table->string("name");      //income name 
            $table->Integer("amount");   //income amount 
            $table->string("category");  //income category
            $table->date("date")->default(now());  //income add date 
            $table->foreignid("user_id")->constrained()->onDelete("cascade"); // foreign key linking to this income to the users table
            $table->timestamps(); // 👈 THIS adds created_at and updated_at
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropifexists("Incomes");
    }
};
