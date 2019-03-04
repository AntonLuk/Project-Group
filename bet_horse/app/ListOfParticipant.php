<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Race;
use App\Horse;

class ListOfParticipant extends Model
{
    public function races(){
        return $this->hasMany(Race::class);
    }
    public function horses(){
        return $this->hasMany(Horse::class);
    }
}
