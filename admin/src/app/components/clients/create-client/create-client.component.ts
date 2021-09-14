import { Component, OnInit } from '@angular/core';
declare var iziToast:any;

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  public client : any = {};

  constructor() { }

  ngOnInit(): void {
  }

  register(registerForm : any){
    if(registerForm.valid){
      console.log(this.client);
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: '#ff0000',
        color: '#fff',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      })
    }
  }

}
