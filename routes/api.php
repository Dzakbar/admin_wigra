<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FilmApplicationController;
use App\Http\Controllers\AuthController;

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// Film CRUD route
Route::apiResource('films', FilmController::class);

// Event CRUD route
Route::apiResource('events', EventController::class);

// Film Application CRUD route
Route::apiResource('film-applications', FilmApplicationController::class);

// Team CRUD route
Route::apiResource('teams', \App\Http\Controllers\TeamController::class);

// User Management routes
Route::get('/users', [\App\Http\Controllers\UserController::class, 'index']);
Route::put('/users/{id}/role', [\App\Http\Controllers\UserController::class, 'updateRole']);

// Dashboard Stats
Route::get('/dashboard/stats', function () {
    return response()->json([
        'totalApplicants' => \App\Models\FilmApplication::count(),
        'activeFilms' => \App\Models\Film::count(),
        'upcomingEvents' => \App\Models\Event::count(),
        'teamMembers' => \App\Models\Team::count(),
        'recentApplicants' => \App\Models\FilmApplication::with('film')->latest()->take(5)->get()
    ]);
});
