<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Horse;

class HorsesController extends Controller
{
    public function index(){
        $horses=Horse::all();
        return ($horses);
    }
    public function add(Request $request){
        $horse=new Horse();
        $horse->name=$request->name;
        $horse->save();
        return($horse);
    }
    public function destroy($id){
        $horse=Horse::find($id);
        $horse->delete();
        return($this->index());
    }
    public function update(Request $request){
        $horse=Horse::find($request->id);
        $horse->name=$request->name;
        $horse->save;
        return($horse);
    }

}
