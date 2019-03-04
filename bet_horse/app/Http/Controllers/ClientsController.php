<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;

class ClientsController extends Controller
{
    public function index(){
        $clients=Client::all();
        return ($clients);
    }
    public function add(Request $request){
        $client=new Client();
        $client->fio=$request->fio;
        $client->phone=$request->phone;
        $client->passport=$request->passport;
        $client->save();
        return($client);
    }
    public function destroy($id){
        $client=Client::find($id);
        $client->delete();
        return($this->index());
    }
    public function update(Request $request){
        $client=Client::find($request->id);
        $client->fio=$request->fio;
        $client->phone=$request->phone;
        $client->passport=$request->passport;
        $client->save;
        return($client);
    }
}
