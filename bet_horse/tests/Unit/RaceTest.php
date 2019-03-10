<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Horse;
use App\Race;

class RaceTest extends TestCase
{
     public function testIndex()
    {
    	$response = $this->get('/races/index');
        $response
        	->assertStatus(200)
        	->assertJsonStructure(
                [
                    [
                        'id',
                        'horse_id',
                        'created_at',
                        'updated_at',
                        'horse' => 
                            [
                                "id",
                                "name",
                                "created_at",
                                "updated_at"
                            ]
                    ]
                ]
            );
    }

    public function testAdd()
    {
    	$horse=new Horse();
        $horse->name='Конь из RaceTest Add';
        $horse->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/races/add', ['horse_id' => $horse->id]);
        $response
        	->assertStatus(201)
        	->assertJson(['horse_id' => $horse->id]);

        $content = $response->decodeResponseJson();
        $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/races/destroy/'.$content['id']);
        
        $horse->delete();
    }

    public function testDestroy()
    {
    	$horse=new Horse();
        $horse->name='Конь из RaceTest Destroy';
        $horse->save();

    	$race = new Race();
        $race->horse_id = $horse->id;
        $race->save();

    	$response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/races/destroy/'.$race->id);

        $response
        	->assertStatus(200)
        	->assertJsonStructure(
                [
                    [
                        'id',
                        'horse_id',
                        'created_at',
                        'updated_at',
                        'horse' => 
                            [
                                "id",
                                "name",
                                "created_at",
                                "updated_at"
                            ]
                    ]
                ]
            );
        $horse->delete();
    }

	public function testUpdate()
    {
		$horse=new Horse();
        $horse->name='Конь из RaceTest Update 1';
        $horse->save();

		$second_horse=new Horse();
        $second_horse->name='Конь из RaceTest Update 2';
        $second_horse->save();

        $race = new Race();
        $race->horse_id = $horse->id;
        $race->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/races/update/', ['id' => $race->id, 'horse_id' => $second_horse->id]);

        $response
        	->assertStatus(200)
        	->assertJson(['horse_id' => $second_horse->id]);
        $race->delete();
        $horse->delete();
        $second_horse->delete();
    }
}
