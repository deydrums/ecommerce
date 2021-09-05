import { Component, OnInit } from '@angular/core';

declare var jQuery:any;
declare var $:any;

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
      alert('No es valido')
    }
  }

}
