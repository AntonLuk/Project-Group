<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::group(['prefix' => 'horses'], function () {
    Route::post('/add','HorsesController@add')->name('horses.add');
  Route::get('/index','HorsesController@index')->name('horses.index');
  Route::get('/destroy/{id}','HorsesController@destroy')->name('horses.destroy');
  Route::post('/update','HorsesController@update')->name('horses.update');
});
Route::group(['prefix' => 'clients'], function () {
    Route::post('/add','ClientsController@add')->name('clients.add');
    Route::get('/index','ClientsController@index')->name('clients.index');
    Route::get('/destroy/{id}','ClientsController@destroy')->name('clients.destroy');
    Route::post('/update','ClientsController@update')->name('clients.update');
});
Route::group(['prefix' => 'races'], function () {
    Route::post('/add','RacesController@add')->name('races.add');
    Route::get('/index','RacesController@index')->name('races.index');
    Route::get('/destroy/{id}','RacesController@destroy')->name('races.destroy');
    Route::post('/update','RacesController@update')->name('races.update');
});
Route::group(['prefix' => 'bets'], function () {
    Route::post('/add','BetsController@add')->name('bets.add');
    Route::get('/index','BetsController@index')->name('bets.index');
    Route::get('/destroy/{id}','BetsController@destroy')->name('bets.destroy');
    Route::post('/update','BetsController@update')->name('bets.update');
});
Route::group(['prefix' => 'list_of_participants'], function () {
    Route::post('/add','ListOfParticipantsController@add')->name('list_of_participants.add');
    Route::get('/index','ListOfParticipantsController@index')->name('list_of_participants.index');
    Route::get('/destroy/{id}','ListOfParticipantsController@destroy')->name('list_of_participants.destroy');
    Route::post('/update','ListOfParticipantsController@update')->name('list_of_participants.update');
});
