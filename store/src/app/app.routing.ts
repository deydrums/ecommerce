import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { IndexComponent } from './components/index/index.component';

const appRoute: Routes = [
    {path : '', component: IndexComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);