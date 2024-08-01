<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\TalesForAllController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

//Controllers
use App\Http\Controllers\HomeController;
use Inertia\Inertia;



Route::middleware(['auth', 'verified'])->group(function () {
    // Ruta para "Mis Historias"
    Route::get('/my-stories', [TalesForAllController::class, 'myStories'])->name('my-stories');
    // Ruta para "Favoritos"
    Route::get('/favorites', [TalesForAllController::class, 'favorites'])->name('favorites');
});
//Public Routes
Route::get('/', function () {
    return redirect()->route('create-story');
})->name('home.index');
Route::get('/explore-stories', [TalesForAllController::class, 'exploreStories'])->name('explore-stories');
Route::get('/create-story', [TalesForAllController::class, 'createStory'])->name('create-story');
Route::get('/story/{slug}', [TalesForAllController::class, 'show'])->name('story-page');
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

require __DIR__ . '/auth.php';
