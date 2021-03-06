import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { IndexComponent } from './components/index/index.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SidebarComponent } from './components/user/sidebar/sidebar.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/user/address/address.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    SidebarComponent,
    IndexProductComponent,
    ShowProductComponent,
    CartComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
