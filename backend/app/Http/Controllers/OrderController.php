<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::with(['items', 'items.product'])->orderBy('created_at', 'desc')->get());
    }

    public function track(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
        ]);

        $orders = Order::with(['items', 'items.product'])
            ->where('customer_phone', $request->phone)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function show($id)
    {
        return response()->json(Order::with(['items', 'items.product'])->findOrFail($id));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id' => 'sometimes|uuid',
            'customer_name' => 'required|string',
            'customer_phone' => 'required|string',
            'customer_city' => 'required|string',
            'customer_address' => 'required|string',
            'total_amount' => 'required|numeric',
            'delivery_fee' => 'required|numeric',
            'status' => 'in:pending,confirmed,shipped,delivered',
            'items' => 'required|array',
            'items.*.product_id' => 'required|uuid|exists:products,id',
            'items.*.price' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            $orderData = [
                'customer_name' => $validated['customer_name'],
                'customer_phone' => $validated['customer_phone'],
                'customer_city' => $validated['customer_city'],
                'customer_address' => $validated['customer_address'],
                'total_amount' => $validated['total_amount'],
                'delivery_fee' => $validated['delivery_fee'],
                'status' => $validated['status'] ?? 'pending',
            ];
            
            if (isset($validated['id'])) {
                $orderData['id'] = $validated['id'];
            }

            $order = Order::create($orderData);

            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json($order->load(['items', 'items.product']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered',
        ]);
        
        $order->update($validated);
        
        return response()->json($order->load(['items', 'items.product']));
    }

    public function destroy($id)
    {
        Order::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
