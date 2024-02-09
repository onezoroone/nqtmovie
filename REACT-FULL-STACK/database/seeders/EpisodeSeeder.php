<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class EpisodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $Faker = Faker::create();
        for ($i=1; $i<1080;$i++){
            DB::table('movie_episodes')->insert([
                'episode_id'=>$i+1,
                'movie_id'=>'3',
                'ep_number'=>$i,
                'ep_link'=>'abc',
            ]);
        }
    }
}
