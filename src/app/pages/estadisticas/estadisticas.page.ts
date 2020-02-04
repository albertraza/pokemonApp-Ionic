import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, from } from 'rxjs';
import { PokemonService } from '../../services/pokemon-service.service';
import { LoadingController } from '@ionic/angular';

@Component({
	selector: 'app-estadisticas',
	templateUrl: './estadisticas.page.html',
	styleUrls: [ './estadisticas.page.scss' ]
})
export class EstadisticasPage implements OnInit, OnDestroy {
	private _params: { id: number; pokemon: string };
	private _loadingDisplay: HTMLIonLoadingElement;
	public pokemon: any;

	constructor(
		private activatedRoute: ActivatedRoute,
		private pokemonService: PokemonService,
		private loadingController: LoadingController
	) {
		this._params = { id: 0, pokemon: null };
	}

	ngOnInit() {
		this.pokemon = {};
		this._getParamsFromURL();
		this._getPokemonInfo();
	}

	ngOnDestroy() {
		this._getParamsFromURL().unsubscribe();
		this.pokemon = {};
	}

	private _getParamsFromURL(): Subscription {
		return this.activatedRoute.params.subscribe((data: { id: number; pokemon: string }) => (this._params = data));
	}

	private _getPokemonInfo(): Subscription {
		if (this._params.id !== 0) {
			return from(this._showLoading()).subscribe(() => {
				this.pokemonService.getPokemonData(this._params.id).subscribe({
					next: (pokemonData: any) => (this.pokemon = pokemonData),
					complete: () => this._loadingDisplay.dismiss()
				});
			});
		} else {
			return;
		}
	}

	private async _showLoading(): Promise<void> {
		this._loadingDisplay = await this.loadingController.create({
			message: 'Cargando pokemon...',
			spinner: 'circles',
			translucent: true
		});

		return await this._loadingDisplay.present();
	}
}
