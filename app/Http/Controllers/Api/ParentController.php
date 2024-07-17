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
        $parent_email = User::where('id', $id)->value('parent_email');
        $children = User::where('parent_email', $parent_email)->latest()->get();

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
