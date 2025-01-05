<?php

declare(strict_types=1);

namespace App\Common\Auth\Service;

use App\Common\Auth\Exception\PasswordResetFailedException;
use App\Common\Auth\Exception\PasswordResetLinkFailedToSendException;
use App\Common\Auth\Request\PasswordResetEmailRequest;
use App\Common\Auth\Request\PasswordResetRequest;
use App\Common\User\Model\User;
use Illuminate\Support\Facades\Password;

final readonly class PasswordResetService
{
    /**
     * @param PasswordResetEmailRequest $request
     * @return void
     * @throws PasswordResetLinkFailedToSendException
     */
    public function sendPasswordResetMail(PasswordResetEmailRequest $request): void
    {
        $request->validated();

        $status = Password::sendResetLink($request->only('email'));

        if($status === Password::RESET_LINK_SENT) throw new PasswordResetLinkFailedToSendException($status);
    }

    /**
     * @param PasswordResetRequest $request
     * @return void
     * @throws PasswordResetFailedException
     */
    public function resetPassword(PasswordResetRequest $request): void
    {
        $data = $request->validated();

        $status = Password::reset(
            credentials: $data,
            callback: fn (User $user, string $password) => $user
                ->forceFill(compact('password'))
                ->save(),
        );

        if($status === Password::PASSWORD_RESET) throw new PasswordResetFailedException($status);
    }
}
