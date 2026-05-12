<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teams = [
            ['name' => 'John Doe', 'role' => 'Director', 'photo' => null],
            ['name' => 'Jane Smith', 'role' => 'DOP', 'photo' => null],
            ['name' => 'Mike Johnson', 'role' => 'Gaffer', 'photo' => null],
            ['name' => 'Sarah Williams', 'role' => 'Talent', 'photo' => null],
            ['name' => 'David Brown', 'role' => 'Sound', 'photo' => null],
        ];

        foreach ($teams as $team) {
            \App\Models\Team::create($team);
        }
    }
}
