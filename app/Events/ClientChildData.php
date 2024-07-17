<?php

namespace App\Events;

use App\Models\ChildData;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ClientChildData implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $parentId;
    public $childId;
    public $apps;
    public $sites;

    /**
     * Create a new event instance.
     */
    public function __construct($parentId, $apps, $sites)
    {
        $user = User::find($this->parentId);
        $this->childId = User::where('parent_email', $user->email)->value('id');
        ChildData::create(['child_id' => $this->childId, 'apps' => $this->apps, 'sites' => $this->sites]);

        $this->parentId = $parentId;
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
            'parentId' => $this->parentId,
            'childId' => $this->childId,
            'apps' => $this->apps,
            'sites' => $this->sites,
        ];
    }
}
