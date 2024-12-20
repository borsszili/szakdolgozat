<?php

declare(strict_types=1);

namespace App\Common\Auth\Service;

use App\Common\Auth\Exception\InvalidEmailException;
use App\Common\Auth\Request\LoginRequest;
use App\Common\Auth\Dto\LoginResponseDto;
use Illuminate\Support\Facades\Auth;

final readonly class LoginService
{
    /**
     * @throws InvalidEmailException
     */
    public function attemptLogin(LoginRequest $request): LoginResponseDto
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            throw new InvalidEmailException();
        }

        $user = Auth::user();
        $token = $user?->createToken(
            name: 'auth_token',
            expiresAt: now()->addWeek()
        )->plainTextToken;

        return LoginResponseDto::serialize(compact('user', 'token'));
    }
}
