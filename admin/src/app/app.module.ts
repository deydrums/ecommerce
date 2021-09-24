import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/ui/navbar/navbar.component';
import { SidebarComponent } from './components/ui/sidebar/sidebar.component';
import { IndexComponent } from './components/index/index.component';
import { routing } from './app.routing';
import { LoginComponent } from './components/login/login.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { IndexClientsComponent } from './components/clients/index-clients/index-clients.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ConfigComponent } from './components/config/config.component';
import { CreateCuponComponent } from './components/cupon/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupon/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupon/update-cupon/update-cupon.component';
import { VarietyProductComponent } from './components/products/variety-product/variety-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    IndexComponent,
    LoginComponent,
    CreateClientComponent,
    EditClientComponent,
    IndexClientsComponent,
    IndexProductComponent,
    CreateProductComponent,
    InventoryProductComponent,
    UpdateProductComponent,
    ConfigComponent,
    CreateCuponComponent,
    IndexCuponComponent,
    UpdateCuponComponent,
    VarietyProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    SweetAlert2Module,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
