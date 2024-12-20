<?php

declare(strict_types=1);

namespace App\Common\Auth\Request;

use Illuminate\Foundation\Http\FormRequest;

final class PasswordResetEmailRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
        ];
    }
}
