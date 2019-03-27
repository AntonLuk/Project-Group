<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Race;
use App\ListOfParticipant;
use App\Client;

class Bet extends Model
{
    public function user(){
        return $this->belongsTo('App\User', 'user_id');
    }

    public function list_of_participant(){
        return $this->belongsTo('App\ListOfParticipant', 'list_of_participants_id');
    }
}
