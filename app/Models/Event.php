<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'photo',
        'name',
        'event_date',
        'description'
    ];
    
}
