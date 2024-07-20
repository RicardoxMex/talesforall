<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryStory extends Model
{
    use HasFactory;

    protected $table = 'category_story';
    
    protected $fillable = [
        'category_id', 'story_id',
    ];
}
