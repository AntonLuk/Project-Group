<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Race;
use App\ListOfParticipant;
use App\User;
use App\Bet;

class RacesController extends Controller
{
    public function index(){
        $races=Race::with('horse')->get();
        return($races);
    }
    public function add(Request $request){
        $race = new Race();
        $race->save();
        return($race);
    }
    public function update(Request $request){
        $race=Race::find($request->id);
        $race->horse_id=$request->horse_id;
        $race->save();
        return($race);
    }

    public function destroy($id){
        $race=Race::find($id);
        $race->delete();
        return($this->index());
    }

    public function generateWinner($id) {
        $participants = ListOfParticipant::select('horse_id')->where('race_id', $id)->get();
        $ids = [];
        for($i = 0; $i < count($participants); $i++) {
            $ids[] = $participants[$i]->horse_id;
        }
        $winner = array_rand($ids, 1);
        $race = Race::find($id);
        if(!$race->horse_id) {
            $race->horse_id = $ids[$winner];
            $race->save();
        }

        $bets = Bet::with(['list_of_participant'])->get();
        $sum = 0;
        for($i = 0; $i < count($bets); $i++) {
            if($bets[$i]->list_of_participant->race_id == $race->id) $sum += $bets[$i]->summ;
        }

        for($i = 0; $i < count($bets); $i++) {
            if($bets[$i]->list_of_participant->race_id == $race->id && $bets[$i]->list_of_participant->horse_id == $race->horse_id) {
                $bets[$i]->prize = $sum;
                $bets[$i]->save();
            }
        }

        return($sum);
    }
}
