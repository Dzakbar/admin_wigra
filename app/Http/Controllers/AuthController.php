<?php

namespace App\Http\Controllers;

use App\Support\PublicUpload;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'telephone_number' => 'required|string|max:20',
            'password' => 'required|string|min:6',
            'profile_photo' => 'nullable|image|max:2048',
        ], [
            'email.unique' => 'Email has already been used.',
        ]);

        $profilePhotoUrl = null;
        if ($request->hasFile('profile_photo')) {
            $profilePhotoUrl = PublicUpload::store($request->file('profile_photo'), 'profiles');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telephone_number' => $request->telephone_number,
            'password' => Hash::make($request->password),
            'role' => 'user',
            'profile_photo' => $profilePhotoUrl
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Register success',
            'data' => $user,
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Login
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
