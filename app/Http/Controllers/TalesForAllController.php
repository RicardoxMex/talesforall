<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\StoryResource;
use App\Models\Category;
use App\Models\Story;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TalesForAllController extends Controller
{
    public function index(){
        $_categories = Category::all();
        
        return Inertia::render('Stories/Index', [
            "categories"=> CategoryResource::collection($_categories),
        ]);
    }
    public function show($slug){
        $story = Story::where("slug","=", $slug)->firstOrFail();
        return Inertia::render('Stories/ShowStory', [
            "storyData"=> new StoryResource($story)
        ]);
    }
    public function myStories(){
        $_stories = Story::where('user_id', auth()->user()->id)->paginate(9)->onEachSide(1);

        //dd($_stories);
        return Inertia::render('Stories/MyStories', [
            'stories'=>StoryResource::collection($_stories)
        ]);
    }

    public function exploreStories(){
        return Inertia::render('Stories/ExploreStories', [
            
        ]);
    }
    public function favorites(){
        return Inertia::render('Stories/Favorites', [
            
        ]);
    }

    public function createStory(){
        $_categories = Category::all();
        
        return Inertia::render('Stories/CreateStory', [
            "categories"=> CategoryResource::collection($_categories),
        ]);
    }


}
