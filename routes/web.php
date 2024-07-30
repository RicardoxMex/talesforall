<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

//Controllers
use App\Http\Controllers\HomeController;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home.index');

//Routes
Route::resource('story', StoryController::class)->except(['create', 'edit']);

/*
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
    ]);
});*/


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
