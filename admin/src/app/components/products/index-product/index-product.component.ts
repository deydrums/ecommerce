import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { global } from '../../../services/global';
declare var jQuery:any;
declare var $:any;
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
  public page = 1;
  public pageSize = 4;

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService
  ) {
    this.loading = true;
    this.filter = '';
    this.token = _adminService.getToken();
    this.url = global.url;
   }

  ngOnInit(): void {
    this.getProducts()
  }

  filterProduct(){
    this.getProducts()
  }

  getProducts() {
    this.loading = true;
    this._productService.getProductsAdmin(this.filter,this.token).subscribe(
      response => {
        this.products = response.data;
        this.loading = false;
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    )
  }

  delete(id:any){
    console.log(id)
    $('#delete-'+id).modal('hide');
    $('.modal-backdrop').removeClass('show');
  }
}

