<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $categories = [
            'Aventurero',
            'Cómico',
            'Inspirador',
            'Misterioso',
            'Romántico',
            'Feliz',
            'Reflexivo',
            'Mágico',
            'Heroico',
            'Melancólico',
            'Triste'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category,
            ]);
        }
    }
}
