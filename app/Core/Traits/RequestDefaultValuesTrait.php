<?php

declare(strict_types=1);

namespace App\Core\Traits;

/**
 * Adds the possibility to add default values to a request class
 *
 * @method has(int|string $key)
 * @method merge(array $array)
 */
trait RequestDefaultValuesTrait
{
    protected function prepareForValidation(): void
    {
        if( method_exists( $this, 'defaults' ) ) {
            foreach ($this->defaults() as $key => $defaultValue) {
                if (!$this->has($key)) $this->merge([$key => $defaultValue]);
            }
        }
    }
}
