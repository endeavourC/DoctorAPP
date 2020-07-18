<?php

namespace App\Filters;
use Illuminate\Database\Eloquent\Builder;

class City implements Filter{

    public static function add(Builder $builder, $value){
        return $builder->where('city', '=', $value);
    }
}