<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\ListOfParticipant;
use App\Race;
use App\Horse;

class ParticipantTest extends TestCase
{
    public function testIndex()
    {
        $response = $this->get('/list_of_participants/index');
        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                        'id',
                        'race_id',
                        'horse_id',
                        'created_at',
                        'updated_at',
                        'horse' => 
                        [
                            'id',
                            'name',
                            'created_at',
                            'updated_at'
                        ],
                        'race' => 
                        [
                        	'id',
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
        $horse = $this->makeHorse();
        $race = $this->makeRace();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/list_of_participants/add', ['horse_id' => $horse->id, 'race_id' => $race->id]);
        $response
            ->assertStatus(201)
            ->assertJson(['horse_id' => $horse->id, 'race_id' => $race->id]);

        $content = $response->decodeResponseJson();
        $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/list_of_participants/destroy/'.$content['id']);

        $this->clearObj($horse, $race);
    }

    public function testDestroy()
    {
        $horse = $this->makeHorse();
        $race = $this->makeRace();
        $list = new ListOfParticipant();
        $list->horse_id = $horse->id;
        $list->race_id = $race->id;
        $list->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/list_of_participants/destroy/'.$list->id);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                        'id',
                        'race_id',
                        'horse_id',
                        'created_at',
                        'updated_at',
                        'horse' => 
                        [
                            'id',
                            'name',
                            'created_at',
                            'updated_at'
                        ],
                        'race' => 
                        [
                        	'id',
                        	'horse_id',
                        	'created_at',
                        	'updated_at'
                        ]
                    ]
                ]
            );
        $list->delete();
        $this->clearObj($horse, $race);
    }

    public function testUpdate()
    {
        $horse = $this->makeHorse();
        $second_horse = $this->makeHorse();
        $race = $this->makeRace();
        $second_race = $this->makeRace();
        $list = new ListOfParticipant();
        $list->horse_id = $horse->id;
        $list->race_id = $race->id;
        $list->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/list_of_participants/update/', ['id' => $list->id, 
        								   				   'horse_id' => $second_horse->id,
        								   			       'race_id' => $second_race->id]);
        $response
            ->assertStatus(200)
            ->assertJson([
                            'id' => $list->id, 
							'horse_id' => $second_horse->id,
							'race_id' => $second_race->id
                        ]);
        $list->delete();
        $this->clearObj($horse, $race);
		$this->clearObj($second_horse, $second_race);
    }

    function makeRace() {
        $horse=new Horse();
        $horse->name='Конь из ParticipantTest';
        $horse->save();
        $race = new Race();
        $race->horse_id = $horse->id;
        $race->save();
        return $race;
    }

    function makeHorse() {
        $horse = new Horse();
        $horse->name='Конь из ParticipantTest';
        $horse->save();
        return $horse;
    }

    function clearObj($horse, $race) {
    	$horse->delete();
    	$horse_from_race = $race->horse;
    	$race->delete();
    	$horse_from_race->delete();
    }
}
