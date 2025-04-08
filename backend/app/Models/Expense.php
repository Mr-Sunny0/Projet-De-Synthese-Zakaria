<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    protected $table = "Expenses";
    protected $fillable = ["name" , "amount" , "category" , "date" , "user_id"] ;
    public function user(){
        return $this->belongsto(user::class);
    }
}
