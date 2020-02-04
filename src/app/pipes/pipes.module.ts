import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonImgPipe } from './pokemon-img.pipe';

@NgModule({
	declarations: [ PokemonImgPipe ],
	imports: [ CommonModule ],
	exports: [ PokemonImgPipe ]
})
export class PipesModule {}
