<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->string('customer_city');
            $table->text('customer_address');
            $table->decimal('total_amount', 10, 2);
            $table->decimal('delivery_fee', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'shipped', 'delivered'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
