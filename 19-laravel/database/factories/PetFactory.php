<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'name' => fake()->name,
            'kind' => fake()->randomElement(array('Dog','Cat','Pig','Mouse')),
            'weight' => fake()->numerify('#.#'),
            'age' => fake()->numberBetween(1,20),
            'breed' =>fake()->randomElement(array('type1','type2','type3')),
            'location' => fake()->city,
            'description' => fake()->sentence(5),
        ];
    }
}
