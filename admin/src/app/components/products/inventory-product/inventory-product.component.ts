import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory-product',
  templateUrl: './inventory-product.component.html',
  styleUrls: ['./inventory-product.component.css']
})
export class InventoryProductComponent implements OnInit {

  public product: any = null;
  public token;

  public file : any | File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';
  public loading_btn:boolean;
  public loading: boolean;
  public url;
  public id;
  public inventory: Array<any> = [];


  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.url = global.url;
    this.id = '';
    this.loading = true;
  }


  ngOnInit(): void {
    this.getdata()
  }
  
  getdata(){
    this.loading = true;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];  
        this._productService.getProductByIdAdmin(this.id,this.token).subscribe(
          response=>{
            this.product = response.data;
            this.imgSelect = this.url +'product/getBanner/' + response.data.banner;
            this._productService.getInventoryAdmin(this.product._id, this.token).subscribe(
              response => {
                this.inventory = response.data;
                this.loading = false;
              },
              error => {
                console.log(error);
                this.loading = false;
              }
            )
          },
          error =>{
            this._iziToastService.showMsg(error.error.message, "error");
            this.loading = false;
            this._router.navigate(['/panel/products'])
          }
        )      
      }
    )
  }

}
