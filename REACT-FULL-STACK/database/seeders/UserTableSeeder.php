<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;
class UserTableSeeder extends Seeder
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
        for ($i=0;$i<10;$i++){
            DB::table('users')->insert([
                'username'=> $Faker->userName,
                'email'=>$Faker->email,
                'password'=>bcrypt($Faker->text),
                'img'=>$Faker->imageUrl($width = 640, $height = 480, 'cats'),
            ]);
        }
    }
}
