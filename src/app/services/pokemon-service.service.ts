import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {
	public favPokemons: any[];
	constructor(private httpClient: HttpClient) {
		this.favPokemons = [];
		this._getDataLocalStorage();
	}

	public getAllPokemon(): Observable<any[]> {
		return this.httpClient.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=500').pipe(
			map((data: any) => {
				return data.results;
			})
		);
	}

	public getPokemonData(id: number): Observable<any> {
		return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
	}

	public addFavoritePokemon(id: number) {
		return new Observable<boolean>((observer: Subscriber<boolean>) => {
			this.getPokemonData(id).subscribe((pokemon: any) => {
				if (pokemon) {
					if (!this._isAdded(pokemon)) {
						this.favPokemons.push({
							id: pokemon.id,
							name: pokemon.name
						});
						this._saveLocalStorage();
						observer.next(true);
						observer.complete();
					} else {
						observer.error({ error: `El pokemon ${pokemon.name} ya esta en tu lista de favoritos` });
						observer.complete();
					}
				}
			});
		});
	}

	public removeFavoritePokemon(index: number): Observable<void> {
		if (this.favPokemons.length === 0) {
			return;
		}

		return new Observable<void>((observer: Subscriber<void>) => {
			this.favPokemons.splice(index, 1);
			this._saveLocalStorage();
			observer.next();
			observer.complete();
		});
	}

	private _saveLocalStorage() {
		localStorage.setItem('favPokemons', JSON.stringify(this.favPokemons));
	}

	private _getDataLocalStorage() {
		if (localStorage.getItem('favPokemons')) {
			this.favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
		}
	}

	private _isAdded(pokemon: any): boolean {
		if (pokemon) {
			for (const favPokemon of this.favPokemons) {
				if (pokemon.name === favPokemon.name) {
					return true;
				}
			}
			return false;
		}
		return;
	}
}
