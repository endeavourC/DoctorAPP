<?php

namespace App\Filters;
use Illuminate\Database\Eloquent\Builder;

class MinPrice implements Filter{

    public static function add(Builder $builder, $value){
        return $builder->where('price', '>', $value);
    }
}