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
        Schema::create("Goals" , function(blueprint $table){
            $table->id();
            $table->integer("price") ;
            $table->integer("months");
            $table->foreignid("user_id")->constrained()->ondelete("cascade");
            $table->date("date")->default(now());
            $table->timestamps(); // 👈 THIS adds created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropifexists("Goals");
    }
};
