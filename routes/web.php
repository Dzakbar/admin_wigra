<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FilmApplicationController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\File;

Route::get('/storage/events/{filename}', function ($filename) {
    $path = storage_path('app/public/events/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});

Route::get('/storage/profiles/{filename}', function ($filename) {
    $path = storage_path('app/public/profiles/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});

Route::get('/storage/teams/{filename}', function ($filename) {
    $path = storage_path('app/public/teams/' . $filename);
    if (!File::exists($path)) {
        abort(404);
    }
    return response()->file($path);
});

Route::get('/{any?}', function () {
    return view('welcome');
})->where('any', '.*');
