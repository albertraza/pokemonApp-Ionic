import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon-service.service';
import { Subscription, from } from 'rxjs';
import { IonList, LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-lista',
	templateUrl: './lista.page.html',
	styleUrls: [ './lista.page.scss' ]
})
export class ListaPage implements OnInit, OnDestroy {
	private _loadingMessage: HTMLIonLoadingElement;
	public pokemons: any[];

	@ViewChild(IonList, { static: true })
	lista: IonList;

	constructor(private pokemonService: PokemonService, private loadingController: LoadingController) {}

	ngOnInit() {
		this.pokemons = [];
		this._getPokemons();
	}

	ngOnDestroy() {
		this._getPokemons().unsubscribe();
	}

	private _getPokemons(): Subscription {
		return from(this._showLoading()).subscribe(() => {
			this.pokemonService.getAllPokemon().subscribe({
				next: (pokemons: any) => (this.pokemons = pokemons),
				complete: () => this._loadingMessage.dismiss()
			});
		});
	}

	public favoritePokemon(id: number): void {
		this.pokemonService.addFavoritePokemon(id).subscribe(() => this.lista.closeSlidingItems());
	}

	public async _showLoading(): Promise<void> {
		this._loadingMessage = await this.loadingController.create({
			message: 'Cargando pokemons ...',
			spinner: 'bubbles',
			translucent: true
		});

		return await this._loadingMessage.present();
	}
}
