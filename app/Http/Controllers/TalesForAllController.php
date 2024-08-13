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
            "storyData"=> new StoryResource($story),
        ]);
    }
    public function showFavorite($slug){
        $story = Story::where("slug","=", $slug)->firstOrFail();
        return Inertia::render('Stories/ShowStory', [
            "storyData"=> new StoryResource($story)
        ]);
    }
    public function myStories(){
        $_stories = Story::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(8)->onEachSide(1);
        return Inertia::render('Stories/Stories', [
            'stories'=>StoryResource::collection($_stories),
            'page'=>'my-stories'
        ]);
    }

    public function exploreStories(){
        $_stories = Story::where('is_public', true)->orderBy('created_at', 'desc')->paginate(8)->onEachSide(1);
        return Inertia::render('Stories/ExploreStories', [
            'stories'=>StoryResource::collection($_stories),
            'page'=>'explore-stories'
        ]);
    }
    public function favorites(){
        $user = auth()->user();
        $_stories = $user->favoriteStories()
        ->orderBy('favorite_story_user.created_at', 'desc')
        ->paginate(8)
        ->onEachSide(1);
        
        return Inertia::render('Stories/Favorites', [
            'stories' => StoryResource::collection($_stories),
            'page'=>'favorites'
        ]);
    }

    public function createStory(){
        $_categories = Category::all();
        
        return Inertia::render('Stories/CreateStory', [
            "categories"=> CategoryResource::collection($_categories),
        ]);
    }


}
