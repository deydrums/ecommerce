import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductService } from 'src/app/services/product.service';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product : any = {
    title : 'Create Product',
    stock: 10,
    price: 110,
    category: 'Categoria 1',
    content: 'Create Product',
    description: 'Description'
  }
  public token;

  public file : any | File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';
  public config: any = {};

  constructor(
    private _productService: ProductService,
    private _adminService: AdminService
  ) { 
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  create(createForm : any){
    if(createForm.valid){
      this._productService.register(this.product, this.file, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Hecho',
            titleColor: '#1dc74c',
            color: '#fff',
            class: 'text-success',
            position: 'topRight',
            message: response.message
          });
        },
        error=>{
          const errors = error.error.errors;
          if(errors){
            for (const error in errors) {
              iziToast.show({
                title: 'Error',
                titleColor: '#ff0000',
                color: '#fff',
                class: 'text-danger',
                position: 'topRight',
                message: errors[error].msg
              });
            }
          }
        }
      );
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

  fileChangeEvent(event:any) : void{
    var file : any;
    if(event.target.files && event.target.files[0]){
      file = <File>event.target.files[0];
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen valida'
      });
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
        iziToast.show({
          title: 'Error',
          titleColor: '#ff0000',
          color: '#fff',
          class: 'text-danger',
          position: 'topRight',
          message: 'El formato debe de ser jpg, webp, jpg o jpeg'
        });
        $('#input-img').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/default.jpg';
        this.file = undefined;
      }
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede ser mayor a 4mb'
      });
      $('#input-img').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/default.jpg';
      this.file = undefined;
    }
    
  }

}
