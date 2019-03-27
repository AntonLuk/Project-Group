<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bet;
use App\Race;
use App\User;
use App\Horse;

class BetsController extends Controller
{
    public function index(Request $request){
        $races = Race::with(['horse'])->get();
        return($races);
    }

    public function getbets($token){
        $user = User::where('token', $token)->get();
        $races = Race::with(['horse'])->get();
        $bets = Bet::where('user_id', $user[0]->id)->with(['list_of_participant'])->get();
        $horses = Horse::all();
        return [
            'races' => $races, 
            'bets' => $bets,
            'horses' => $horses,
        ];
    }

    public function add(Request $request){
        $bet=new Bet();
        $bet->summ = $request->summ;
        $bet->user_id = $request->user_id;
        $bet->list_of_participants_id=$request->list_id;
        $user = User::where('token', $request->token)->first();
        $bet->user_id = $user->id;
        $bet->save();
        return($bet);
    }

    public function update(Request $request){
        $bet=Bet::find($request->id);
        $bet->summ=$request->summ;
        $bet->prize=$request->prize;
        $bet->client_id=$request->client_id;
        $bet->list_of_participants_id=$request->list_of_participants_id;
        $bet->save();
        return($bet);
    }
    public function destroy($id){
        $bet=Bet::find($id);
        $bet->delete();
        return($this->index());
    }
}
