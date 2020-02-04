import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'pokemonImg'
})
export class PokemonImgPipe implements PipeTransform {
	transform(value: number, id: boolean = false): string {
		if (!id) {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value + 1}.png`;
		} else {
			return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`;
		}
	}
}
