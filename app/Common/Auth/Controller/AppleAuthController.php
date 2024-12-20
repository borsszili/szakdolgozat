<?php

namespace App\Common\Auth\Controller;

use App\Common\Auth\Contracts\OAuthProviderControllerInterface;
use App\Common\User\Model\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse as IlluminateRedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class AppleAuthController implements OAuthProviderControllerInterface
{

    private const SOCIALITE_DRIVER = 'apple';

    public function redirectToProvider(): SymfonyRedirectResponse|IlluminateRedirectResponse
    {
        return Socialite::driver(self::SOCIALITE_DRIVER)->redirect();
    }

    public function handleProviderCallback(): Application|Redirector|IlluminateRedirectResponse
    {
        $appleUser = Socialite::driver(self::SOCIALITE_DRIVER)->user();

        $user = User::query()->updateOrCreate(
            ['apple_id' => $appleUser->id],
            [
                'name' => $appleUser->name,
                'email' => $appleUser->email,
                'password' => Str::password(12),
                'email_verified_at' => now(),
            ]
        );

        Auth::login($user);

        return redirect(
            to: config('app.url') . "/dashboard"
        );
    }
}
