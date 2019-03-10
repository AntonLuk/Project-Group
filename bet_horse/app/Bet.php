<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Race;
use App\ListOfParticipant;
use App\Client;

class Bet extends Model
{
    public function client(){
        return $this->belongsTo('App\Client', 'client_id');
    }

    public function list_of_participant(){
        return $this->belongsTo('App\ListOfParticipant', 'list_of_participants_id');
    }
}
