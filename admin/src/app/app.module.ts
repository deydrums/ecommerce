import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { IndexComponent } from './components/index/index.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientsComponent } from './components/clients/index-clients/index-clients.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';
import { CreateCuponComponent } from './components/cupon/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupon/index-cupon/index-cupon.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientsComponent,
    CreateClientComponent,
    EditClientComponent,
    CreateProductComponent,
    IndexProductComponent,
    UpdateProductComponent,
    InventoryProductComponent,
    CreateCuponComponent,
    IndexCuponComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
