<?php

use App\Http\Controllers\Api\AuthController as ApiAuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Socket\ChildDataController;
use App\Http\Controllers\Socket\ControlCommandController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [ApiAuthController::class, 'register']);
    Route::post('login', [ApiAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [ApiAuthController::class, 'logout']);
        Route::post('refresh', [ApiAuthController::class, 'refresh']);
        Route::get('user', [UserController::class, 'getAllUsers']);
    });
});

Route::prefix('app')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('children/{parent_id}', [UserController::class, 'getChildren']);
        Route::get('user/{id}', [UserController::class, 'getUser']);
    });
});

Route::prefix('socket')->group(function () {
    // Route::middleware('auth:sanctum')->group(function () {
        Route::post('child-data', [ChildDataController::class, 'callPusher']);
        Route::post('block-app', [ControlCommandController::class, 'blackApp']);
    // });
});
