import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-variety-product',
  templateUrl: './variety-product.component.html',
  styleUrls: ['./variety-product.component.css']
})
export class VarietyProductComponent implements OnInit {

  public token;
  public loading_btn:boolean;
  public loading: boolean;
  public product: any = {};
  public id : any;

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService,
    private _iziToastService: IziToastService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.token = this._adminService.getToken();
    this.loading_btn = false;
    this.loading = true;
  }

  ngOnInit(): void {
    this.getdata();
  }

  getdata(){
    this.loading = true;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];  
        this._productService.getProductByIdAdmin(this.id,this.token).subscribe(
          response=>{
            this.product = response.data;
            this.loading = false;
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
