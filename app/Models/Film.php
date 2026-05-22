<?php

namespace App\Models;

use App\Support\PublicUpload;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    //
    public function registrations()
    {
        return $this->hasMany(FilmApplication::class);
    }

    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => PublicUpload::publicUrl($value),
        );
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
