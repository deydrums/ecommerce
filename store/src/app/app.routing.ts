import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { AddressComponent } from './components/user/address/address.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

const appRoute: Routes = [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'cuenta/perfil', component: ProfileComponent, canActivate:[AuthGuard]},
    {path: 'cuenta/direcciones', component: AddressComponent, canActivate:[AuthGuard]},
    {path: 'carrito', component: CartComponent, canActivate:[AuthGuard]},
    {path: 'products', component: IndexProductComponent},
    {path: 'products/category/:category', component: IndexProductComponent},
    {path: 'products/:slug', component: ShowProductComponent},

];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);