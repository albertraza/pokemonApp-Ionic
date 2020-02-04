import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service.service';
import { IonList } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-favoritos',
	templateUrl: './favoritos.page.html',
	styleUrls: [ './favoritos.page.scss' ]
})
export class FavoritosPage implements OnInit {
	public favPokemons: any[];

	@ViewChild(IonList, { static: true })
	lista: IonList;

	constructor(private pokemonService: PokemonService) {}

	ngOnInit() {
		this.favPokemons = this.pokemonService.favPokemons;
	}

	public removeFav(index: number): Subscription {
		return this.pokemonService.removeFavoritePokemon(index).subscribe(() => {
			this.lista.closeSlidingItems();
		});
	}
}
