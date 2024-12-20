<?php

declare(strict_types=1);

namespace App\Common\Auth\Controller;

use App\Common\Auth\Dto\RegisterResponseDto;
use App\Common\Auth\Exception\InvalidEmailException;
use App\Common\Auth\Request\LoginRequest;
use App\Common\Auth\Request\LogoutRequest;
use App\Common\Auth\Dto\LoginResponseDto;
use App\Common\Auth\Request\PasswordResetEmailRequest;
use App\Common\Auth\Request\PasswordResetRequest;
use App\Common\Auth\Request\RegisterRequest;
use App\Common\Auth\Service\LoginService;
use App\Common\Auth\Service\PasswordResetService;
use App\Common\Auth\Service\RegisterService;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class AuthController
{
    /**
     * @param RegisterRequest $request
     * @param RegisterService $registerService
     * @return JsonResponse<RegisterResponseDto>
     */
    public function register(
        RegisterRequest $request,
        RegisterService $registerService,
    ): JsonResponse
    {
        try {
            $response = $registerService->attemptRegister($request);
        } catch (\Throwable) {
            return response()->json("Something went wrong", 500);
        }

        return response()->json($response);
    }

    /**
     * @param LoginRequest $request
     * @param LoginService $loginService
     * @return JsonResponse<LoginResponseDto>
     */
    public function login(
        LoginRequest $request,
        LoginService $loginService
    ): JsonResponse
    {
        try {
            $response = $loginService->attemptLogin($request);
        } catch (InvalidEmailException) {
            return response()->json('Invalid email or password', 401);
        } catch (\Throwable $exception) {
            return response()->json("Something went wrong", 500);
        }

        return response()->json($response);
    }

    /**
     * @param LogoutRequest $request
     * @return JsonResponse
     */
    public function logout(LogoutRequest $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json();
    }

    /**
     * @param PasswordResetEmailRequest $request
     * @param PasswordResetService $passwordResetService
     * @return JsonResponse
     */
    public function sendResetPassword(
        PasswordResetEmailRequest $request,
        PasswordResetService      $passwordResetService
    ): JsonResponse
    {
        try {
            $passwordResetService->sendPasswordResetMail($request);
        } catch (\Throwable) {
            return response()->json("Something went wrong", 500);
        }

        return response()->json();
    }

    /**
     * @param PasswordResetRequest $request
     * @param PasswordResetService $passwordResetService
     * @return JsonResponse
     */
    public function resetPassword(
        PasswordResetRequest $request,
        PasswordResetService $passwordResetService
    ): JsonResponse
    {
        try {
            $passwordResetService->resetPassword($request);
        } catch (Throwable) {
            return response()->json("Something went wrong", 500);
        }

        return response()->json();
    }
}
