<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Horse extends Model
{
	public function races(){
        return $this->hasMany('App\Race', 'horse_id');
    }
}
