<?php

namespace App\Core\Dto;

use App\Core\Dto\Annotations\DatabaseColumn;
use App\Core\Dto\Annotations\Serialize;
use App\Core\Dto\Annotations\Serializer\RemovePropertyIfNull;
use Illuminate\Support\Str;

#[\AllowDynamicProperties]
class BaseDto
{
    public static function serialize(mixed $item): static
    {
        $object = new static();

        self::processSerialization($item, $object);

        return $object;
    }

    public function serializeSelf(mixed $item): void
    {
        self::processSerialization($item, $this);
    }

    /**
     * @throws \ReflectionException
     */
    private static function processSerialization(mixed $item, $object): void
    {
        collect(self::getClassProperties())->each(function ($keys, $property) use ($object, $item) {
            $data = collect($keys['keys'])
                ->map(fn($value) => data_get($item, $value))
                ->first(fn($value) => !is_null($value));

            if (is_null($data) && self::shouldRemovePropertyIfNull($keys['attributes'])) {
                unset($object->$property);
                return;
            }

            if (!is_null($data)) {
                $object->$property = $keys['serializable'] ?? false
                    ? self::attemptSerialization($keys['type'], $data)
                    : $data;

                return;
            }

            if (!empty($keys["keys"])) {
                $object->$property = $keys['default'] ?? null;
            }
        });
    }

    private static function attemptSerialization($type, $data)
    {
        try {
            return $type::serialize($data);
        } catch (\Throwable $e) {
            return $data;
        }
    }

    /**
     * @throws \ReflectionException
     */
    private static function getClassProperties(): array
    {
        $ref = new \ReflectionClass(static::class);

        return collect($ref->getProperties(\ReflectionProperty::IS_PUBLIC | \ReflectionProperty::IS_PROTECTED))
            ->mapWithKeys(function (\ReflectionProperty $property) {
                $attributes = collect($property->getAttributes());

                $serializer = $attributes
                    ->first(fn(\ReflectionAttribute $attribute) => $attribute->getName() === Serialize::class)
                    ?->newInstance();

                $otherAttributes = $attributes->reject(fn(\ReflectionAttribute $attribute) => $attribute->getName() === Serialize::class);

                $keys = $serializer
                    ? [$serializer->getSerializedKey(), ...$serializer->getKeys()]
                    : [];

                return [
                    $property->getName() => [
                        'keys' => $keys,
                        'attributes' => $otherAttributes->all(),
                        'serializable' => self::checkIfTypeIsSerializable($property->getType()),
                        'type' => $property->getType()->getName(),
                        'default' => $property->isDefault() ? $property->getDefaultValue() : null,
                    ],
                ];
            })
            ->all();
    }

    public static function getSerializableFields(): array
    {
        $ref = new \ReflectionClass(static::class);

        return collect($ref->getProperties(\ReflectionProperty::IS_PUBLIC | \ReflectionProperty::IS_PROTECTED))
            ->map(fn(\ReflectionProperty $property) => getAttributeByName(
                ref: $property,
                attribute: Serialize::class,
                throwsError: false
            ))
            ->filter(fn($attribute) => !is_bool($attribute))
            ->map(fn($attribute) => $attribute->getSerializedKey())
            ->all();
    }

    /**
     * Megnezi, hogy a namespace tartalmazza-e a dto-t
     *
     * @param string $name
     * @return bool
     */
    private static function checkIfTypeIsSerializable(string $name): bool
    {
        return (str_contains(strtolower($name), "dto")); //nem a legszebb megoldas, peldanyositani kellene, es megnezni, hogy a BaseDto-t orokli
    }


    public static function executeConverterAttributes($attributes, $data)
    {
        foreach ($attributes as $attribute) {
            $data = $attribute->newInstance()->run($data);
        }

        return $data;
    }

    private static function shouldRemovePropertyIfNull(array $attributes): bool
    {
        /* @var \ReflectionAttribute $attribute */
        return array_any($attributes, fn($attribute) => $attribute->getName() == RemovePropertyIfNull::class);

    }

    public function getDatabaseConvertedFormat(): array
    {
        $ref = new \ReflectionClass($this);

        return collect($ref->getProperties(\ReflectionProperty::IS_PUBLIC))
            ->filter(fn(\ReflectionProperty $property) => $property->getAttributes(DatabaseColumn::class))
            ->mapWithKeys(fn(\ReflectionProperty $property) => [Str::snake($property->getName()) => $property->getValue($this)])
            ->all();
    }
}
