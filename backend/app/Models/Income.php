<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Income extends Model
{
    protected $table = "Incomes";
    protected $fillable = ["name" , "amount" , "category" , "date" , "user_id"] ;
    public function user(){
        return $this->belongsto(user::class);
    }
}
