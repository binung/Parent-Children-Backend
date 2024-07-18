<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getChildren($id)
    {
        $user = User::find($id);
        $children = User::where('parent_email', $user->email)->latest()->get();

        if ($children) {
            return response()->json([
                'success' => true,
                'children' => $children
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Children not found'
            ], 404);
        }
    }

    public function getUser($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'success' => true,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }
    }

    public function getAllUsers()
    {
        $user = User::all();

        if ($user) {
            return response()->json([
                'success' => true,
                'user' => $user
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data not found'
            ], 404);
        }
    }
}
