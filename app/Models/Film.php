<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    //
    public function registrations()
    {
        return $this->hasMany(FilmApplication::class);
    }

    protected $fillable = [
    'video',
    'name',
    'director_name',
    'duration',
    'genre',
    'synopsis',
    'photo',
    'category',
    'application_start_date',
    'application_deadline',
    'roles_needed'
];
}
