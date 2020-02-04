import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pokemon-card',
	templateUrl: './pokemon-card.component.html',
	styleUrls: [ './pokemon-card.component.scss' ]
})
export class PokemonCardComponent implements OnInit {
	@Input() pokemonMetaData: any = {};
	@Input() index: number = 0;
	@Input() favPage: boolean = false;

	constructor(private router: Router) {}

	ngOnInit() {}

	public goToPokemon(index: number, pokemon: string): void {
		if (!this.favPage) {
			this.router.navigate([ 'tabs', 'lista', 'estadisticas', index, pokemon ]);
		} else {
			this.router.navigate([ 'tabs', 'favoritos', 'estadisticas', index, pokemon ]);
		}
	}
}
