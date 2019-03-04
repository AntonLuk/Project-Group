<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Horse;

class Race extends Model
{
    //
    public function horses(){
        return $this->hasMany(Horse::class);
    }

}
