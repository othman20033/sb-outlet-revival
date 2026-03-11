<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = \App\Models\Category::all()->keyBy('name');

        $products = [
            [
                'name' => 'Veste en Cuir Vintage Années 90',
                'price' => 850,
                'original_price' => 1200,
                'brand' => 'Schott NYC',
                'size' => 'L',
                'category_id' => $categories['Homme']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80',
                    'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80'
                ],
                'status' => 'available',
                'description' => 'Authentique veste en cuir des années 90, patine incroyable.',
            ],
            [
                'name' => 'Jeans Levi\'s 501 Original',
                'price' => 450,
                'original_price' => 800,
                'brand' => 'Levi\'s',
                'size' => 'W32 L32',
                'category_id' => $categories['Homme']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80'
                ],
                'status' => 'available',
                'description' => 'Le classique intemporel. Très bon état.',
            ],
            [
                'name' => 'Sac à Main Monogramme Vintage',
                'price' => 1200,
                'brand' => 'Luxury Vintage',
                'size' => 'Unique',
                'category_id' => $categories['Accessoires']->id,
                'images' => [
                    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80'
                ],
                'status' => 'available',
                'description' => 'Pièce de collection rare.',
            ]
        ];

        foreach ($products as $prod) {
            \App\Models\Product::create($prod);
        }
    }
}
