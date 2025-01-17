<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;
    protected $fillable = [
        'slug',
        'title',
        'story',
        'summary',
        'image_prompt',
        'is_public',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_stories');
    }
    
    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorite_story_user')->withTimestamps();
    }

}
