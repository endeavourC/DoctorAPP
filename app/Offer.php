<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title', 'description', 'price', 'city', 'image', 'image_thumbnail', 'slug'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
