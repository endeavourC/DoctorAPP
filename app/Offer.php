<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    protected $fillable = [
        'title', 'description', 'price', 'city', 'image', 'image_thumbnail'
    ];

    public function user(){
        return $this->hasOne(User::class);
    }
}
