import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { ProductService } from 'src/app/services/product.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  public product: any = null;
  public token;

  public file : any | File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';
  public config: any = {};
  public loading_btn:boolean;
  public loading: boolean;
  public url;
  public id;

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

  updateProduct(updateForm:any){
    if(updateForm.valid){
      this._productService.update(this.product, this.file, this.id , this.token).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
        }
      )
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");
      this.loading_btn = false;
    }
  }


  
  fileChangeEvent(event:any) : void{
    var file : any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
      this._iziToastService.showMsg("No hay una imagen valida", "error");

      $('#input-img').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/default.jpg';
      this.file = undefined;
    }

    if(file?.size <= 4000000){
      if(file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);
        $('#input-img').text(file.name);
        this.file = file;
      }else{
        this._iziToastService.showMsg("El formato debe de ser jpg, webp, jpg o jpeg", "error");

        $('#input-img').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/default.jpg';
        this.file = undefined;
      }
    }else{
      this._iziToastService.showMsg("La imagen no puede ser mayor a 4mb", "error");
      
      $('#input-img').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/default.jpg';
      this.file = undefined;
    }
    
  }


}
