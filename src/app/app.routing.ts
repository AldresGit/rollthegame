import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { RollerComponent } from './components/roller/roller.component';
import { InformationComponent } from './components/information/information.component';
import { MygamesComponent } from './components/mygames/mygames.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
	{path: '', component: LoadingComponent, data: {animation: 'LoadingPage'} },
	{path: 'roller', component: RollerComponent, data: {animation: 'HomePage'} },
	{path: 'info', component: InformationComponent, data: {animation: 'AboutPage'} },
	{path: 'mygames', component: MygamesComponent, data: {animation: 'GamesPage'} },
	{path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);