<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Race;
use App\Horse;

class ListOfParticipant extends Model
{
    public function race(){
        return $this->belongsTo('App\Race', 'race_id');
    }
    public function horse(){
        return $this->belongsTo('App\Horse', 'horse_id');
    }

    public function bets(){
        return $this->hasMany('App\Bet', 'list_of_participants_id');
    }
}
