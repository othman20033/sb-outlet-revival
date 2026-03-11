<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name', 'price', 'original_price', 'brand', 'size', 
        'category_id', 'images', 'status', 'description', 'drop_id'
    ];

    protected $casts = [
        'images' => 'array',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
