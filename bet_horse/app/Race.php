<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Race extends Model
{
	public function horse(){
        return $this->belongsTo('App\Horse', 'horse_id');
    }
}
