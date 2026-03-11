<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Product;
use App\Models\Order;

class StatusController extends Controller
{
    public function index()
    {
        $status = [
            'app_name' => config('app.name'),
            'env' => config('app.env'),
            'debug' => config('app.debug') ? 'ENABLED' : 'DISABLED',
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'database_status' => 'OFFLINE',
            'database_driver' => config('database.default'),
            'database_name' => config('database.connections.' . config('database.default') . '.database'),
            'products_count' => 0,
            'orders_count' => 0,
            'memory_usage' => $this->getMemoryUsage(),
            'server_time' => now()->toDateTimeString(),
            'api_routes' => $this->getApiRoutes(),
        ];

        try {
            DB::connection()->getPdo();
            $status['database_status'] = 'ONLINE';
            $status['products_count'] = Product::count();
            $status['orders_count'] = Order::count();
        } catch (\Exception $e) {
            $status['database_error'] = $e->getMessage();
        }

        return view('status', compact('status'));
    }

    private function getApiRoutes()
    {
        $routes = [];
        foreach (\Route::getRoutes() as $route) {
            if (str_starts_with($route->uri(), 'api/')) {
                $routes[] = [
                    'method' => implode('|', $route->methods()),
                    'uri' => '/' . $route->uri(),
                ];
            }
        }
        return $routes;
    }

    private function getMemoryUsage()
    {
        $size = memory_get_usage(true);
        $unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');
        return @round($size / pow(1024, ($i = floor(log($size, 1024)))), 2) . ' ' . $unit[$i];
    }
}
