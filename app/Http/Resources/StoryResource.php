<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public $_wrap = true;
    public function toArray(Request $request): array
    {
        $user = User::where("id", $this->user_id)->first();
        return [
            'id'=>$this->id,
            'slug'=>(string)$this->slug,
            'title'=>$this->title,
            'summary'=>$this->summary,
            'story'=>$this->story,
            'categories'=>CategoryResource::collection($this->categories),
            'author'=> $user->name,
            'user_id'=>(int)$user->id,
        ];
    }
}