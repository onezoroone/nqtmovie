<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExampleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i < 200; $i++) {
            DB::table('episodes')->insert([
                'idMovie' => 2,
                'ep_number' => $i,
                'slug' => 'tap-'.$i,
                'ep_link' => 'https://embed1.streamc.xyz/embed.php?hash=94434ce8c68945db90001d3a16a7402c',
                'created_at' => now()
            ]);
        }
    }
}
