<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\FilmApplication;
use App\Support\PublicUpload;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'telephone_number',
        'password',
        'role',
        'profile_photo',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',

            // automatically hash password
            'password' => 'hashed',
        ];
    }

    // User can have many film applications
    public function registrations()
    {
        return $this->hasMany(FilmApplication::class);
    }

    protected function profilePhoto(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => PublicUpload::publicUrl($value),
        );
    }

    // Check if user is admin
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // Check if user is super admin
    public function isSuperAdmin()
    {
        return $this->role === 'super_admin';
    }
}
