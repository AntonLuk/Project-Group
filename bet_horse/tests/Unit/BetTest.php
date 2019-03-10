<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Bet;
use App\Client;
use App\ListOfParticipant;
use App\Race;
use App\Horse;

class BetTest extends TestCase
{
    public function testIndex()
    {
        $response = $this->get('/bets/index');
        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                        'id',
                        'summ',
                        'prize',
                        'client_id',
                        'list_of_participants_id',
                        'created_at',
                        'updated_at',
                        'client' => 
                        [
                                'id',
                                'fio',
                                'phone',
                                'passport',
                                'created_at',
                                'updated_at'
                        ],
                        'list_of_participant' => 
                        [
                            'id',
                            'race_id',
                            'horse_id',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]
            );
    }

    public function testAdd()
    {
        $client = $this->makeClient();
        $list = $this->makeList();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/bets/add', ['summ' => '100', 'prize' => '200', 'client_id' => $client->id, 
                                       'list_of_participants_id' => $list->id]);
        $response
            ->assertStatus(201)
            ->assertJson(['summ' => '100', 'prize' => '200', 'client_id' => $client->id, 
                                       'list_of_participants_id' => $list->id]);

        $content = $response->decodeResponseJson();
        $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/bets/destroy/'.$content['id']);

        $this->clearObj($client, $list);
    }

    public function testDestroy()
    {
        $client = $this->makeClient();
        $list = $this->makeList();
        $bet = new Bet();
        $bet->summ = '100';
        $bet->prize = '200';
        $bet->client_id = $client->id;
        $bet->list_of_participants_id = $list->id;
        $bet->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/bets/destroy/'.$bet->id);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                        'id',
                        'summ',
                        'prize',
                        'client_id',
                        'list_of_participants_id',
                        'created_at',
                        'updated_at',
                        'client' => 
                        [
                                'id',
                                'fio',
                                'phone',
                                'passport',
                                'created_at',
                                'updated_at'
                        ],
                        'list_of_participant' => 
                        [
                            'id',
                            'race_id',
                            'horse_id',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]
            );
        $bet->delete();
        $this->clearObj($client, $list);
    }

    public function testUpdate()
    {
        $client = $this->makeClient();
        $list = $this->makeList();
        $bet = new Bet();
        $bet->summ = '100';
        $bet->prize = '200';
        $bet->client_id = $client->id;
        $bet->list_of_participants_id = $list->id;
        $bet->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/bets/update/', [
                                           'id' => $bet->id, 
                                           'summ' => '200', 
                                           'prize' => '300',
                                           'client_id' => $client->id, 
                                           'list_of_participants_id' => $list->id
                                        ]);

        $response
            ->assertStatus(200)
            ->assertJson([
                            'id' => $bet->id, 
                            'summ' => '200', 
                            'prize' => '300',
                            'client_id' => $client->id, 
                            'list_of_participants_id' => $list->id
                        ]);
        $bet->delete();
        $this->clearObj($client, $list);
    }

    function makeList() {
        $list = new ListOfParticipant();
        $race = new Race();
        $race->save();
        $horse = new Horse();
        $horse->name = 'Конь из BetTest';
        $horse->save();

        $list->race_id = $race->id;
        $list->horse_id = $horse->id;
        $list->save();

        return $list;
    }

    function makeClient() {
        $client = new Client();
        $client->fio = 'Клиент из BetTest';
        $client->phone = '+789056789045';
        $client->passport = '1234 567890';
        $client->save();

        return $client;
    }

    function clearObj($client, $list) {
        $client->delete();
        $race = $list->race;
        $horse = $list->horse;
        $list->delete();
        $race->delete();
        $horse->delete();
    }
}
