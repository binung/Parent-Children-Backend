<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

class ChildDataUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $parentId;
    public $childId;
    public $apps;
    public $sites;

    /**
     * Create a new event instance.
     */
    public function __construct($parentId)
    {
        $this->parentId = $parentId;
        // $this->childId = $childId;
        // $this->apps = $apps;
        // $this->sites = $sites;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastOn()
    {
        Log::info('broadcastOn request success');

        // return new PrivateChannel('parent.' . $this->parentId);
        return new Channel('parent.' . $this->parentId);
        // return Broadcast::channel('parent.1');
    }

    public function broadcastWith()
    {
        return [
            'parentId' => $this->parentId,
            // 'childId' => $this->childId,
            // 'apps' => $this->apps,
            // 'sites' => $this->sites,
            // 'message' => 'Updated data received!'
        ];
    }

    // public function broadcastAs()
    // {
    // }

    // public function broadcastWhen()
    // {
    // }
}
