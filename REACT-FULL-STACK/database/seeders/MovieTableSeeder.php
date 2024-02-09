<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $categories = array(
            array('id' => '1','category' => 'Action'),
            array('id' => '2','category' => 'Adventure'),
            array('id' => '3','category' => 'Cartoon'),
            array('id' => '4','category' => 'Comedy'),
            array('id' => '5','category' => 'Dementia'),
            array('id' => '6','category' => 'Demons'),
            array('id' => '7','category' => 'Drama'),
            array('id' => '8','category' => 'Ecchi'),
            array('id' => '9','category' => 'Fantasy'),
            array('id' => '10','category' => 'Game'),
            array('id' => '11','category' => 'Harem'),
            array('id' => '12','category' => 'Historical'),
            array('id' => '13','category' => 'Horror'),
            array('id' => '14','category' => 'Josei'),
            array('id' => '15','category' => 'Kids'),
            array('id' => '16','category' => 'Live Action'),
            array('id' => '17','category' => 'Magic'),
            array('id' => '18','category' => 'Martial Arts'),
            array('id' => '19','category' => 'Mecha'),
            array('id' => '20','category' => 'Military'),
            array('id' => '21','category' => 'Music'),
            array('id' => '22','category' => 'Mystery'),
            array('id' => '23','category' => 'Parody'),
            array('id' => '24','category' => 'Police'),
            array('id' => '25','category' => 'Psychological'),
            array('id' => '26','category' => 'Romance'),
            array('id' => '27','category' => 'Samurai'),
            array('id' => '28','category' => 'School'),
            array('id' => '29','category' => 'Sci-Fi'),
            array('id' => '30','category' => 'Seinen'),
            array('id' => '31','category' => 'Shoujo'),
            array('id' => '32','category' => 'Shoujo Ai'),
            array('id' => '33','category' => 'Shounen'),
            array('id' => '34','category' => 'Shounen Ai'),
            array('id' => '35','category' => 'Slice of Life'),
            array('id' => '36','category' => 'Space'),
            array('id' => '37','category' => 'Sports'),
            array('id' => '38','category' => 'Super Power'),
            array('id' => '39','category' => 'Supernatural'),
            array('id' => '40','category' => 'Thriller'),
            array('id' => '41','category' => 'Vampire'),
            array('id' => '42','category' => 'Trinh thám')
          );
        $Faker = Faker::create();
        for ($i=0;$i<10;$i++){
            DB::table('categories')->insert($categories);
        }
    }
}
