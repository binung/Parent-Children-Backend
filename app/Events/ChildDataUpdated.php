<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

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
    public function __construct($parentId, $childId, $apps, $sites)
    {
        $this->parentId = $parentId;
        $this->childId = $childId;
        $this->apps = $apps;
        $this->sites = $sites;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('parent.' . $this->parentId),
        ];
        // return new Channel('parent.'.$this->parentId);
    }

    public function broadcastWith()
    {
        return [
            'childId' => $this->childId,
            'apps' => $this->apps,
            'sites' => $this->sites,
            'message' => 'Updated data received!'
        ];
    }

    public function broadcastAs()
    {
    }

    public function broadcastWhen()
    {
    }
}
