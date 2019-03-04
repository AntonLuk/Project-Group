<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ListOfParticipant;
class ListOfParticipantsController extends Controller
{
    public function index(){
        $lists=ListOfParticipant::with(['horses','races'])->get();
        return($lists);
    }
    public function add(Request $request){
        $list=new ListOfParticipant();
        $list->race_id=$request->race_id;
        $list->horse_id=$request->horse_id;
        $list->save();
        return($list);
    }
    public  function update(Request $request){
        $list=ListOfParticipant::find($request->id);
        $list->race_id=$request->race_id;
        $list->horse_id=$request->horse_id;
        $list->save();
        return($list);
    }
    public function destroy($id){
        $list=ListOfParticipant::find($id);
        $list->delete();
        return($this->index());
    }
}
