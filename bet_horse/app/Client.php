<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    public function bets(){
        return $this->hasMany('App\Bet', 'client_id');
    }
}
