<?php

namespace App\Http\Controllers\Socket;

use App\Events\ChildDataUpdated;
use App\Http\Controllers\Controller;
use App\Models\ChildData;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class ChildDataController extends Controller
{
    public function store(Request $request)
    {
        $childId = $request->childId;
        $apps = $request->apps;
        $sites = $request->sites;

        ChildData::create(['child_id' => $childId, 'apps' => $apps, 'sites' => $sites]);

        $user = User::find($childId);
        $parentId = User::where('email', $user->parent_email)->value('id');

        Log::info('parentId: ' . $parentId);

        // Broadcast data to parent
        // broadcast(new ChildDataUpdated($parentId, $childId, $apps, $sites));
        ChildDataUpdated::dispatch($parentId, $childId, $apps, $sites);

        return response()->json(['message' => 'Data received and broadcasted successfully']);
    }
}
