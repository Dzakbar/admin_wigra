<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FilmApplicationController;
use App\Http\Controllers\AuthController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// Film CRUD route
Route::apiResource('films', FilmController::class);

// Event CRUD route
Route::apiResource('events', EventController::class);

// Film Application CRUD route
Route::apiResource('film-applications', FilmApplicationController::class);
