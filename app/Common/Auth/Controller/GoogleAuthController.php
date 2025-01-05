<?php

namespace App\Common\Auth\Controller;

use App\Common\Auth\Contracts\OAuthProviderControllerInterface;
use App\Common\User\Model\User;
use App\Common\User\Repository\UserRepository;
use Illuminate\Http\RedirectResponse as IlluminateRedirectResponse;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;
use \Illuminate\Foundation\Application;

final readonly class GoogleAuthController implements OAuthProviderControllerInterface
{
    private const string SOCIALITE_DRIVER = 'google';

    public function __construct(
        private UserRepository $userRepository,
    ) {}

    public function redirectToProvider(): SymfonyRedirectResponse|IlluminateRedirectResponse
    {
        return Socialite::driver(self::SOCIALITE_DRIVER)->redirect();
    }

    public function handleProviderCallback(): Application|Redirector|IlluminateRedirectResponse
    {
        $googleUser = Socialite::driver(self::SOCIALITE_DRIVER)
            ->stateless()
            ->user();

        $userByEmail = $this->userRepository->getByEmail($googleUser->getEmail());
        $userByGoogleId = $this->userRepository->getByGoogleId($googleUser->getId());

        $alreadyLoggedInWithoutGoogle = is_null($userByGoogleId) && !is_null($userByEmail);

        if($alreadyLoggedInWithoutGoogle) {
            $userByEmail::query()->update(['google_id' => $googleUser->getId()]);

            $user = $userByEmail;
        } else {
            $user = User::query()->updateOrCreate(
                ['google_id' => $googleUser->id],
                [
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
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
            to: config('app.url') . "/#dashboard"
        );
    }
}
