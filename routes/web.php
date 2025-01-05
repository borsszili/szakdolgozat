<?php

use App\Common\Auth\Controller\AppleAuthController;
use App\Common\Auth\Controller\AuthController;
use App\Common\Auth\Controller\GoogleAuthController;
use App\Common\TestController;
use App\Domain\Appointment\Controller\AppointmentCommandController;
use App\Domain\Appointment\Controller\AppointmentQueryController;
use App\Domain\Employee\Controller\EmployeeCommandController;
use App\Domain\Employee\Controller\EmployeeQueryController;
use App\Domain\Service\Controller\ServiceCommandController;
use App\Domain\Service\Controller\ServiceQueryController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('appointment')->group(function () {
        Route::controller(AppointmentQueryController::class)->group(function () {
            Route::get('/', 'index')->name('appointment.index');
            Route::get('/{id}', 'show')->name('appointment.show');
            Route::post('/available-times', 'calculateAvailableDates')->name('appointment.available-times');
        });

        Route::controller(AppointmentCommandController::class)->group(function () {
            Route::post('/', 'create')->name('appointment.create');
            Route::put('/{id}', 'update')->name('appointment.update');
            Route::delete('/{id}', 'delete')->name('appointment.delete');
        });
    });

    Route::prefix('service')->group(function () {
        Route::controller(ServiceQueryController::class)->group(function () {
            Route::get('/', 'index')->name('service.index');
            Route::get('/{id}', 'show')->name('service.show');
        });

        Route::controller(ServiceCommandController::class)->group(function () {
            Route::post('/', 'create')->name('service.create');
            Route::put('/{id}', 'update')->name('service.update');
            Route::delete('/{id}', 'delete')->name('service.delete');
        });
    });

    Route::prefix('employee')->group(function () {
        Route::controller(EmployeeCommandController::class)->group(function () {
            Route::get('/', 'index')->name('employee.index');
            Route::get('/{id}', 'show')->name('employee.show');
        });

        Route::controller(EmployeeQueryController::class)->group(function () {
            Route::post('/', 'create')->name('employee.create');
            Route::put('/{id}', 'update')->name('employee.update');
            Route::delete('/{id}', 'delete')->name('employee.delete');
        });
    });
});

Route::get('test', [TestController::class, 'test']);
