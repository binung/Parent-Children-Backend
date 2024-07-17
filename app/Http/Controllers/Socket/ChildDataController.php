<?php

namespace App\Http\Controllers\Socket;

use App\Events\ChildDataUpdated;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChildDataController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        event(new ChildDataUpdated($data));
        return response()->json(['status' => 'success']);
    }
}
