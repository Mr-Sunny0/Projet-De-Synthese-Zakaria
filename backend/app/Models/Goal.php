<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $table = "Goals" ;
    protected $fillable = ["price" ,"name" , "months" ,"monthly_target" ,"date" , "user_id"] ;
    public function user(){
        return $this->belongsto(user::class);
    }
}
