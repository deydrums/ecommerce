import { Component, OnInit } from '@angular/core';

declare var iziToast:any;


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public product : any = {

  }

  public file : any | File = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/default.jpg';

  constructor() { }

  ngOnInit(): void {
  }

  create(createForm : any){
    if(createForm.valid){
      console.log(this.product);
      
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
    }

    if(file?.size <= 4000000){
      if(file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/jpeg'){
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        reader.readAsDataURL(file);
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
      this.imgSelect = 'assets/img/default.jpg';
      this.file = undefined;
    }
    
  }

}
