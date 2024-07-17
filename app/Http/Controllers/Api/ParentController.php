<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ParentController extends Controller
{
    public function getChildren(Request $request)
    {
        $parent_email = User::where('id', $request->id)->value('email');
        $childrens = User::where('parent_email', $parent_email)->latest()->get();

        return response()->json(['childrens' => $childrens], 200);
    }
}
