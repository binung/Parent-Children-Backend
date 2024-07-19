<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if ($request->email && User::where('email', $request->email)->exists()) {
            return response()->json(['message' => 'Email already exists'], 422);
        }

        $parent_email = is_null($request->parent_email) ? null : $request->parent_email;

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'parent_email' => $parent_email,
            'role_id' => $request->role_id,
        ]);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    public function login(Request $request)
    {
        // Check if the input is an email or a name
        $input = $request->input('email');
        $isEmail = filter_var($input, FILTER_VALIDATE_EMAIL);

        // Validate the request
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', $isEmail ? 'email' : 'max:255'],
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Attempt to log the user in
        $credentials = $isEmail ? ['email' => $input, 'password' => $request->password] : ['name' => $input, 'password' => $request->password];
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }

        // Retrieve the authenticated user
        $user = Auth::user();

        // Create a token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        $expiration = Carbon::now()->addMinutes(config('sanctum.expiration'));

        // Return the user and token
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_at' => $expiration,
            'user' => [
                'id' => $user->id,
                'name' => $user->name
            ]
        ], 200);
    }

    public function logout()
    {
        // Revoke the user's token
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }

    public function refresh(Request $request)
    {
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        $expiration = now()->addMinutes(config('sanctum.expiration'))->timestamp;

        return response()->json(['token' => $token, 'token_type' => 'Bearer', 'expiration' => $expiration]);
    }
}
