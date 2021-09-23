import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';

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
  public pageSize = 10;
  public loading_btn: boolean = false;

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

  delete(id:any, title:any){
    Swal.fire({
      title: 'Eliminar Cliente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No',
      html: '<span style="color: white">Quieres el producto: ' + title + '<span>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading_btn = true;
        this._productService.delete(id, this.token).subscribe(
          response => {
            this._iziToastService.showMsg(response.message, "success");
            this.loading_btn = false;
            this.getProducts();
          },
          error => {
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading_btn = false;
          }
        )
      }
    })


  }
}

