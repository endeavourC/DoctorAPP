<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
class Offer extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'city' => $this->city,
            'image_thumbnail' => $this->image_thumbnail,
            'description' => $this->description,
            'price' => $this->price,
            'user'=> [
                'id' => $this->user->id,
                'name' => $this->user->name
            ],
            'created_at' => $this->created_at,
        ];
    }
}
