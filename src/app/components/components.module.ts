import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
	declarations: [ PokemonCardComponent ],
	imports: [ CommonModule, PipesModule, IonicModule ],
	exports: [ PokemonCardComponent ]
})
export class ComponentsModule {}
