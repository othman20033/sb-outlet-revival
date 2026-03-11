<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Créer l'administrateur
        User::create([
            'name' => 'Admin SB Outlet',
            'email' => 'admin@sboutlet.com',
            'password' => bcrypt('admin123'),
        ]);

        // Créer les catégories de base (celles de /src/data/mock.ts)
        $categories = [
            ['name' => 'Homme', 'slug' => 'homme'],
            ['name' => 'Femme', 'slug' => 'femme'],
            ['name' => 'Enfant', 'slug' => 'enfant'],
            ['name' => 'Accessoires', 'slug' => 'accessoires'],
            ['name' => 'Nouveautés', 'slug' => 'nouveautes'],
            ['name' => 'Promotions', 'slug' => 'promotions'],
        ];

        foreach ($categories as $cat) {
            \App\Models\Category::create($cat);
        }

        $this->call([
            ProductSeeder::class,
        ]);
    }
}
