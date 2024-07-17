<?php

use App\Http\Controllers\Api\AuthController as ApiAuthController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\UserController;

Route::prefix('auth')->group(function () {
    Route::post('register', [ApiAuthController::class, 'register']);
    Route::post('login', [ApiAuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [ApiAuthController::class, 'logout']);
        Route::post('refresh', [ApiAuthController::class, 'refresh']);
    });
});

Route::prefix('app')->group(function () {
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('children/{parent_id}', [UserController::class, 'getChildren']);
        Route::get('user/{id}', [UserController::class, 'getChild']);
    });
});
