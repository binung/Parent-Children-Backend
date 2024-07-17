<?php

namespace App\Http\Controllers\Socket;

use App\Http\Controllers\Controller;
use App\Events\BlockAppCommand;
use Illuminate\Http\Request;

class ControlCommandController extends Controller
{
    public function blockApp(Request $request)
    {
        $data = $request->all();
        event(new BlockAppCommand($data));
        return response()->json(['status' => 'success']);
    }
}
