<?php

namespace App\Common\Auth\Schedule;

use Illuminate\Support\Facades\Artisan;

final readonly class RemoveExpiredTokens
{
    public function __invoke(): void
    {
        Artisan::call('sanctum:prune-expired --hours=24');
    }
}
