<?php

namespace App\Models;

use App\Support\PublicUpload;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected function photo(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => PublicUpload::publicUrl($value),
        );
    }

    protected $fillable = [
        'name',
        'role',
        'photo'
    ];
}
