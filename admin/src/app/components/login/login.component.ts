import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;
declare var iziToast:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any = {};

  constructor() { 
  }

  ngOnInit(): void {
  }

  login(loginForm:any){
    if(loginForm.valid){
      console.log(this.user);
      alert('Si es valido')
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
