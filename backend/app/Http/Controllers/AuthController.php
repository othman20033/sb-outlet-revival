<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    public function login(Request $request)
    {
        // For simplicity if the frontend only sends password, we could hardcode the email,
        // but let's accept both or fallback to a default admin email.
        $email = $request->input('email', 'admin@sboutlet.com');
        
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // Check if it's the default admin123 password and there's no user yet
            if ($request->password === 'admin123' && !$user) {
                $user = User::create([
                    'name' => 'Admin',
                    'email' => 'admin@sboutlet.com',
                    'password' => Hash::make('admin123'),
                ]);
            } else {
                throw ValidationException::withMessages([
                    'password' => ['Incorrect credentials.'],
                ]);
            }
        }

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('auth_token')->plainTextToken
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
