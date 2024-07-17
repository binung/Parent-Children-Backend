<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ParentController extends Controller
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
}
