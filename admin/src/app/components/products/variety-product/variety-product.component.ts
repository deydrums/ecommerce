import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { v1 as uuidv1 } from 'uuid';

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
  public variety: String;
  public url;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';



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
    this.variety = '';
    this.url = global.url;

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
            this.imgSelect = this.url +'product/getBanner/' + response.data.banner;
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

  addVariety(){
    if(this.variety){
      this.product.varieties.push({
        title: this.variety,
        _id: uuidv1()
      })
      this.variety = '';
    }else{
      this._iziToastService.showMsg("La variedad no es valida", "error");
    }

  }

  deleteVariety(id:any){
    this.product.varieties.splice(id, 1);
  }

  updateProduct(){
    this.loading_btn = true;
    if(this.product.title_variety && this.product.varieties.length > 0){
      this._productService.update(this.product, undefined, this.id , this.token).subscribe(
        response => {
          this._iziToastService.showMsg(response.message, "success");
          this.loading_btn = false;
          this.getdata();
        },
        error => {
          this._iziToastService.showMsg(error.error.message, "error");
          this.loading_btn = false;
        }
      )
    }else{
      this._iziToastService.showMsg("Debe colocar un titulo y una variedad", "error");
      this.loading_btn = false;
    }
  }


}
