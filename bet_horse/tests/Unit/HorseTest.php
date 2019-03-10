<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Horse;
use App\Http\Controllers\HorsesController;

class HorseTest extends TestCase
{
    public function testIndex()
    {
        $response = $this->get('/horses/index');
        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                            'id',
                            'name',
                            'created_at',
                            'updated_at'
                    ]
                ]
            );
    }

    public function testAdd()
    {
        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/horses/add', ['name' => 'Мистер Молодец']);
        $response
            ->assertStatus(201)
            ->assertJson(['name' => 'Мистер Молодец']);

        $content = $response->decodeResponseJson();
        $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/horses/destroy/'.$content['id']);
    }

    public function testDestroy()
    {
        $horse=new Horse();
        $horse->name='Конь';
        $horse->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/horses/destroy/'.$horse->id);

        $response
            ->assertStatus(200)
            ->assertJsonStructure(
                [
                    [
                            'id',
                            'name',
                            'created_at',
                            'updated_at'
                    ]
                ]
            );
    }

    public function testUpdate()
    {
        $horse=new Horse();
        $horse->name='Конь';
        $horse->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/horses/update/', ['id' => $horse->id, 'name' => 'Мистер Молодец']);

        $response
            ->assertStatus(200)
            ->assertJson(['name' => 'Мистер Молодец']);
        $horse->delete();
    }
}
