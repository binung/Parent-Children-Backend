<?php

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('parent.{parentId}', function ($user, int $parentId) {
    return $user->id = $parentId;
});

Broadcast::channel('child.{childId}', function ($user, $childId) {
    return $user->id === $childId;
});
