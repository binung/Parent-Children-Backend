<?php

namespace App\Http\Controllers\Socket;

use App\Http\Controllers\Controller;
use App\Events\BlockAppCommand;
use Illuminate\Http\Request;

class ControlCommandController extends Controller
{
    public function blockApp(Request $request)
    {
        // Handle block app request from parent
        $childId = $request->input('parentId');
        $appId = $request->input('appId');

        // Broadcast block command to the child
        broadcast(new BlockAppCommand($childId, $appId));
        return response()->json(['status' => 'success']);
    }
}
