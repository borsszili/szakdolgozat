<?php

use App\Common\Auth\Controller\AppleAuthController;
use App\Common\Auth\Controller\AuthController;
use App\Common\Auth\Controller\GoogleAuthController;
use App\Common\TestController;
use Illuminate\Support\Facades\Route;

Route::view('/', 'app')->name('booking');

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login')->name('login');
    Route::post('/register', 'register')->name('register');
    Route::post('/logout', 'logout')->name('logout');
    Route::post('/forgot-password', 'sendResetPassword')->name('forgot-password');
    Route::post('/reset-password', 'resetPassword')->name('reset-password');
});

Route::controller(AppleAuthController::class)->group(function () {
    Route::get('/auth/apple/redirect', 'redirectToProvider');
    Route::get('/auth/apple/callback', 'handleProviderCallback');
});

Route::controller(GoogleAuthController::class)->group(function () {
    Route::get('/auth/google/redirect', 'redirectToProvider');
    Route::get('/auth/google/callback', 'handleProviderCallback');
});

Route::get('test', [TestController::class, 'test']);
