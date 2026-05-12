<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'SuperAdmin',
            'email' => 'superadmin@gmail.com',
            'telephone_number' => '081111111111',
            'profile_photo' => null,
            'role' => 'super_admin',
            'password' => Hash::make('password'),
        ]);

        // Admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'telephone_number' => '082222222222',
            'profile_photo' => null,
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);

        // Normal User
        User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'telephone_number' => '083333333333',
            'profile_photo' => null,
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);
    }
}