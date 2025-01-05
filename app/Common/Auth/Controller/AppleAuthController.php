<?php

namespace App\Common\Auth\Controller;

use App\Common\Auth\Contracts\OAuthProviderControllerInterface;
use App\Common\User\Model\User;
use App\Common\User\Repository\UserRepository;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse as IlluminateRedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

final readonly class AppleAuthController implements OAuthProviderControllerInterface
{
    private const string SOCIALITE_DRIVER = 'apple';

    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function redirectToProvider(): SymfonyRedirectResponse|IlluminateRedirectResponse
    {
        return Socialite::driver(self::SOCIALITE_DRIVER)->redirect();
    }

    public function handleProviderCallback(): Application|Redirector|IlluminateRedirectResponse
    {
        $appleUser = Socialite::driver(self::SOCIALITE_DRIVER)->user();

        $userByEmail = $this->userRepository->getByEmail($appleUser->getEmail());
        $userByAppleId = $this->userRepository->getByAppleId($appleUser->getId());

        $alreadyLoggedInWithoutGoogle = is_null($userByAppleId) && !is_null($userByEmail);

        if($alreadyLoggedInWithoutGoogle) {
            $userByEmail::query()->update(['google_id' => $appleUser->getId()]);

            $user = $userByEmail;
        } else {
            $user = User::query()->updateOrCreate(
                ['apple_id' => $appleUser->id],
                [
                    'name' => $appleUser->name,
                    'email' => $appleUser->email,
                    'password' => Str::password(12),
                    'email_verified_at' => now(),
                ]
            );
        }

        Auth::login($user);

        $user?->createToken(
            name: 'auth_token',
            expiresAt: now()->addWeek()
        )->plainTextToken;

        return redirect(
            to: config('app.url') . "/dashboard"
        );
    }
}
