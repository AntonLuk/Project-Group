<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Client;

class ClientTest extends TestCase
{
 public function testIndex()
    {
    	$response = $this->get('/clients/index');
        $response
        	->assertStatus(200)
        	->assertJsonStructure(
                [
                    [
                        'id',
                        'fio',
                        'phone',
                        'passport',
                        'created_at',
                        'updated_at'
                    ]
                ]
            );
    }

    public function testAdd()
    {
        // Тестируем добавление
		$response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/clients/add', ['fio' => 'Мистер Молодец', 'phone' => '+70000', 'passport' => '0194 678454']);
        $response
        	->assertStatus(201)
        	->assertJson(['fio' => 'Мистер Молодец', 'phone' => '+70000', 'passport' => '0194 678454']);

        $content = $response->decodeResponseJson();
        // Удаляем вставленную запись из БД
        $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/clients/destroy/'.$content['id']);
	}

    public function testDestroy()
    {
    	$client = new Client();
        $client->fio = 'Второй';
        $client->phone = '+789056789045';
        $client->passport = '1234 567890';

        $client->save();

    	$response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('GET', '/clients/destroy/'.$client->id);

        $response
        	->assertStatus(200)
        	->assertJsonStructure(
                [
                    [
                        'id',
                        'fio',
                        'phone',
                        'passport',
                        'created_at',
                        'updated_at'
                    ]
                ]
            );
    }

	public function testUpdate()
    {
		$client = new Client();
        $client->fio = 'Третий';
        $client->phone = '+789056789045';
        $client->passport = '1234 567890';
        $client->save();

        $response = $this->withHeaders([
            'X-Header' => 'Value',
        ])->json('POST', '/clients/update/', [
        									  'id' => $client->id, 
        									  'fio' => 'Четвёртый',
        									  'phone' => '+70000', 
        									  'passport' => '0194 678454'
        									]);

        $response
        	->assertStatus(200)
        	->assertJson(['fio' => 'Четвёртый', 'phone' => '+70000', 'passport' => '0194 678454']);
        $client->delete();
    }
}
