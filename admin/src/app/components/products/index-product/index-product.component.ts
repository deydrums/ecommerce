import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';
import { global } from '../../../services/global';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {
  
  public loading: boolean;
  public filter : string;
  public token;
  public products: Array<any> = [];
  public url: string;

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
  ) {
    this.loading = true;
    this.filter = '';
    this.token = _adminService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this._productService.getProductsAdmin(this.filter,this.token).subscribe(
      response => {
        this.products = response.data;
        this.loading = false;
      },
      error => {
        console.log(error)
      }
    )
  }

}
