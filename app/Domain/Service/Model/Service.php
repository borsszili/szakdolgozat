<?php

declare(strict_types=1);

namespace App\Domain\Service\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Service extends Model
{
    use HasFactory;

    protected $table = 'service';
}
