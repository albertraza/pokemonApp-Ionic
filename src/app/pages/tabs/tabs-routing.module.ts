import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'lista',
				children: [
					{
						path: '',
						loadChildren: () => import('../lista/lista.module').then((m) => m.ListaPageModule)
					},
					{
						path: 'estadisticas/:id/:pokemon',
						loadChildren: () =>
							import('../estadisticas/estadisticas.module').then((m) => m.EstadisticasPageModule)
					}
				]
			},
			{
				path: 'favoritos',
				children: [
					{
						path: '',
						loadChildren: () => import('../favoritos/favoritos.module').then((m) => m.FavoritosPageModule)
					},
					{
						path: 'estadisticas/:id/:pokemon',
						loadChildren: () =>
							import('../estadisticas/estadisticas.module').then((m) => m.EstadisticasPageModule)
					}
				]
			},
			{
				path: '',
				redirectTo: '/tabs/lista',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/lista',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class TabsPageRoutingModule {}
