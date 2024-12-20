<?php

declare(strict_types=1);

namespace App\Common\Auth\Request;

use Illuminate\Foundation\Http\FormRequest;

final class PasswordResetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'confirmPassword' => 'required|same:password',
            'token' => 'required',
        ];
    }
}
