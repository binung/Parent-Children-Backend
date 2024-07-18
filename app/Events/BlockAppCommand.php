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

class BlockAppCommand implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $childId;
    public $appId;
    /**
     * Create a new event instance.
     */
    public function __construct($childId, $appId)
    {
        $this->childId = $childId;
        $this->appId = $appId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        // return new PrivateChannel('child.' . $this->childId);

        return Broadcast::channel('child.' . $this->childId);
    }

    public function broadcastWith()
    {
        return ['appId' => $this->appId, 'message' => 'Block command received!'];
    }
}
