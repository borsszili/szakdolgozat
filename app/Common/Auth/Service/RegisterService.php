<?php

declare(strict_types=1);

namespace App\Common\Auth\Service;

use App\Common\Auth\Dto\RegisterResponseDto;
use App\Common\Auth\Request\RegisterRequest;
use App\Common\User\Model\User;
use Illuminate\Support\Facades\Hash;

final readonly class RegisterService
{
    public function attemptRegister(RegisterRequest $request): RegisterResponseDto
    {
        $data = $request->validated();
        $data["password"] = Hash::make($data["password"]);

        $user = User::query()->create($data);

        return RegisterResponseDto::serialize(compact('user'));
    }
}
