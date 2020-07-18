<?php

namespace App\Pagination;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
class Pagination {
    public static function getPagesCount(Builder $builder, int $pageLimit = 5){

        /**
         * Get all of offers count.
         */

        $getTotalDataCount = $builder->get()->count();

        /**
         * Get the paginations page length and return it.
         */
        
         $getTotalPageLength = ceil( $getTotalDataCount / $pageLimit );


         return $getTotalPageLength;

    }

    public static function getCurrentPage(Request $request){

        return $request->query('page', 1);

    }
}