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
        $parent_email = User::find($id)->value('email');
        $datas = User::where('parent_email', $parent_email)->latest()->get();

        return response()->json(['datas' => $datas], 200);
    }
}
