<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateListOfParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_of_participants', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('race_id')->unsigned();
            $table->foreign('race_id')->references('id')->on('races');
            $table->integer('horse_id')->unsigned();
            $table->foreign('horse_id')->references('id')->on('horses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('list_of_participants');
    }
}
