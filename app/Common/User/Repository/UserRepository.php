<?php

declare(strict_types=1);

namespace App\Common\User\Repository;

use App\Common\User\Model\User;

final readonly class UserRepository
{
    public function getById(int $id): ?User
    {
        return User::query()->find($id);
    }

    public function getByEmail(string $email): ?User
    {
        return User::query()->where("email", $email)->first();
    }

    public function getByGoogleId(string $googleId): ?User
    {
        return User::query()->where("google_id", $googleId)->first();
    }

    public function getByAppleId(string $appleId): ?User
    {
        return User::query()->where("apple_id", $appleId)->first();
    }
}
