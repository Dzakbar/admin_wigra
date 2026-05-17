<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FilmApplication extends Model
{
    //
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function film()
    {
        return $this->belongsTo(Film::class);
    }
    protected $fillable = [
        'user_id',
        'film_id',
        'name',
        'contact',
        'phone_number',
        'role',
        'portfolio_link',
        'notes',
        'status',
    ];

}
