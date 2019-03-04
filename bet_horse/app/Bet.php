<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Race;
use App\ListOfParticipant;
use App\Client;

class Bet extends Model
{
    public function races(){
        return $this->hasMany(Race::class);
    }
    public function clients(){
        return $this->hasMany(Client::class);
    }
    public function list_of_participants(){
        return $this->hasMany(ListOfParticipant::class);
    }
}
