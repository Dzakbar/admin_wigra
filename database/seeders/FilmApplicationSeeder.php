<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FilmApplication;

class FilmApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        FilmApplication::create([
            'user_id' => 3,
            'film_id' => 1,
            'name' => 'John Doe',
            'contact' => 'john@example.com / 08123456789',
            'role' => 'Talent',
            'portfolio_link' => 'https://portfolio.com/johndoe',
            'notes' => 'I have 5 years of experience in acting.',
            'status' => 'pending'
        ]);

        FilmApplication::create([
            'user_id' => 3,
            'film_id' => 2,
            'name' => 'Jane Smith',
            'contact' => 'jane@example.com',
            'role' => 'DOP',
            'portfolio_link' => 'https://vimeo.com/janesmith',
            'notes' => 'I worked on several indie films before.',
            'status' => 'accepted'
        ]);
    }
}
