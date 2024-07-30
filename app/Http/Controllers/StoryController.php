<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Http\Requests\StoreStoryRequest;
use App\Http\Requests\UpdateStoryRequest;

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

       $story->title = $request->title;
       $story->story = $request->story;
       $story->summary = $request->summary;
       $story->image_prompt = $request->image_prompt;

       if($request->user_id == 0){
        $story->user_id = 1;
       }else{
        $story->user_id = $request->user_id;
       }

       $story->save();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Story $story)
    {
        //
    }
}
