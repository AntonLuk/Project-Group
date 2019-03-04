<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Bet;

class BetsController extends Controller
{
    public function index(){
        $bets=Bet::with(['races','clients','list_of_participants'])->get();
        return($bets);
    }
    public function add(Request $request){
        $bet=new Bet();
        $bet->summ=$request->summ;
        $bet->prize=$request->prize;
        $bet->client_id=$request->client_id;
        $bet->list_of_participants_id=$request->list_of_participants_id;
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
