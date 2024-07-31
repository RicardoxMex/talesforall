<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TalesForAllController extends Controller
{
    public function index(){
        $_categories = Category::all();
        
        return Inertia::render("Home/Index", [
            "categories"=> CategoryResource::collection($_categories),
        ]);
    }

    public function myStories(){
        return Inertia::render("MyStories/Index", [
            
        ]);
    }

    public function exploreStories(){
        return Inertia::render("ExploreStories/Index", [
            
        ]);
    }
    public function favorites(){
        return Inertia::render("Favorites/Index", [
            
        ]);
    }

    public function createStory(){
        $_categories = Category::all();
        
        return Inertia::render("CreateStory/Index", [
            "categories"=> CategoryResource::collection($_categories),
        ]);
    }


}
