<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Race;

class RacesController extends Controller
{
    public function index(){
    $races=Race::with('horses')->get();
    return($races);
    }
    public function add(Request $request){
        $race=new Race();
        $race->horse_id=$request->horse_id;
        $race->save();
        return($race->with('horses'));
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
}
