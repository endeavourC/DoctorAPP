<?php

namespace App\Filters;
use Illuminate\Database\Eloquent\Builder;

interface Filter {

    /**
     * @param Builder $builder
     * @param mixed $value
     * @return Builder $builder
     */

    public static function add(Builder $builder, $value);
}