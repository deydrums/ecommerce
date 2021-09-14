import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { IndexClientsComponent } from './components/clients/index-clients/index-clients.component';
import { IndexComponent } from "./components/index/index.component";
import { LoginComponent } from './components/login/login.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { AdminGuard } from './guards/admin.guard';

const appRoute: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate:[AdminGuard]},
    {path: 'panel',children:[
        {path: 'clients', component: IndexClientsComponent, canActivate:[AdminGuard]},
        {path: 'clients/register', component: CreateClientComponent, canActivate:[AdminGuard]},
        {path: 'clients/:id', component: EditClientComponent, canActivate:[AdminGuard]},

        {path: 'products/create', component: CreateProductComponent, canActivate:[AdminGuard]},
    ]},
    {path: 'login', component: LoginComponent},
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);