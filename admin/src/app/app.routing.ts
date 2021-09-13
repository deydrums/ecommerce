import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { IndexClientsComponent } from './components/clients/index-clients/index-clients.component';
import { IndexComponent } from "./components/index/index.component";
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';

const appRoute: Routes = [
    {path: 'index', component: IndexComponent, canActivate:[AdminGuard]},
    {path: 'panel',children:[
        {path: 'clients', component: IndexClientsComponent, canActivate:[AdminGuard]}
    ]},
    {path: 'login', component: LoginComponent},
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);