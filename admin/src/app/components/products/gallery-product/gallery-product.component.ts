import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';
import { v1 as uuidv1 } from 'uuid';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-gallery-product',
  templateUrl: './gallery-product.component.html',
  styleUrls: ['./gallery-product.component.css']
})
export class GalleryProductComponent implements OnInit {

  public token;
  public loading_btn:boolean;
  public loading: boolean;
  public product: any = {};
  public id : any;
  public file : any | File = undefined;
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

  updateProduct(){

  }

  deleteImg(id:any){

  }

  addImg(){
    if(this.file){
      this.loading_btn = true;
      const data = {
        banner: this.file,
        _id: uuidv1(),
      }
      this._productService.addImgGallery(this.id,data,this.token).subscribe(
        response => {
          this._iziToastService.showMsg(response.message, "success");
          this.loading_btn = false;
          this.product = response.data;
        },
        error =>{
          this._iziToastService.showMsg(error.error.message, "error");
          this.loading_btn = false;
        }
      )
    }else{
      this._iziToastService.showMsg("Debe seleccionar una imagen", "error");
      this.loading_btn = false;
    }
  }

  fileChangeEvent(event:any) : void{
    var file : any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
      this._iziToastService.showMsg("No hay una imagen valida", "error");
      this.file = undefined;
    }

    if(file?.size <= 4000000){
      if(file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/jpeg'){
        this.file = file;
      }else{
        this._iziToastService.showMsg("El formato debe de ser jpg, webp, jpg o jpeg", "error");
        this.file = undefined;
      }
    }else{
      this._iziToastService.showMsg("La imagen no puede ser mayor a 4mb", "error");
      this.file = undefined;
    }    
  }
}
