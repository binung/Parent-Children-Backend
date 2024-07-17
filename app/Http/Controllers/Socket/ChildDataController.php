<?php

namespace App\Http\Controllers\Socket;

use App\Events\ChildDataUpdated;
use App\Http\Controllers\Controller;
use App\Models\ChildData;
use Illuminate\Http\Request;

class ChildDataController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->all();
        // ChildData::create($data);

        // Broadcast data to parent
        broadcast(new ChildDataUpdated($data));
        return response()->json(['status' => 'success']);
    }
}
