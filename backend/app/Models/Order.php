<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'customer_name', 'customer_phone', 'customer_city', 
        'customer_address', 'total_amount', 'delivery_fee', 'status'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
