<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Story;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;
use Illuminate\Support\Str;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStoryRequest $request)
    {
        $story = new Story();
       // dd($request);
        $story->title = $request->title;
        $story->story = $request->story;
        $story->summary = $request->summary;
        $story->image_prompt = $request->image_prompt;

        $slug = Str::slug($story->title);
        $existingStoryCount = Story::where('slug', 'like', "$slug%")->count();
        if ($existingStoryCount > 0) {
            $slug = "{$slug}-{$existingStoryCount}";
        }
        $story->slug = $slug;

        if ($request->user_id == 0) {
            $story->user_id = 1;
        } else {
            $story->user_id = $request->user_id;
        }
        $story->updated_at = now();

        $story->save();

        // Asociar categorías
        $story->categories()->attach($request->categories);
    }

    /**
     * Display the specified resource.
     */
    public function show(Story $story)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStoryRequest $request, Story $story)
    {
        $story->title = $request->title;
        $story->is_public = $request->is_public;
        $story->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        //
    }
}
