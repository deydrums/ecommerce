import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { IndexClientsComponent } from './components/clients/index-clients/index-clients.component';
import { ConfigComponent } from './components/config/config.component';
import { CreateCuponComponent } from './components/cupon/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupon/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupon/update-cupon/update-cupon.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { GalleryProductComponent } from './components/products/gallery-product/gallery-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { VarietyProductComponent } from './components/products/variety-product/variety-product.component';
import { AdminGuard } from './guards/admin.guard';


const appRoute: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent, canActivate:[AdminGuard]},
    {path: 'panel',children:[
        {path: 'clients', component: IndexClientsComponent, canActivate:[AdminGuard]},
        {path: 'clients/register', component: CreateClientComponent, canActivate:[AdminGuard]},
        {path: 'clients/:id', component: EditClientComponent, canActivate:[AdminGuard]},

        {path: 'products/create', component: CreateProductComponent, canActivate:[AdminGuard]},
        {path: 'products', component: IndexProductComponent, canActivate:[AdminGuard]},
        {path: 'product/:id', component: UpdateProductComponent, canActivate:[AdminGuard]},
        {path: 'product/inventory/:id', component: InventoryProductComponent, canActivate:[AdminGuard]},
        {path: 'product/varieties/:id', component: VarietyProductComponent, canActivate:[AdminGuard]},
        {path: 'product/gallery/:id', component: GalleryProductComponent, canActivate:[AdminGuard]},

        {path: 'cupon/create', component: CreateCuponComponent, canActivate:[AdminGuard]},
        {path: 'cupon/:id', component: UpdateCuponComponent, canActivate:[AdminGuard]},
        {path: 'cupon', component: IndexCuponComponent, canActivate:[AdminGuard]},

        {path: 'config', component: ConfigComponent, canActivate:[AdminGuard]},

        ]
    },
    {path: 'login', component: LoginComponent},

];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);