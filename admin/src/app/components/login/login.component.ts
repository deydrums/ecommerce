import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor( private _adminService: AdminService) { 
  }

  ngOnInit(): void {
  }

  login(loginForm:any){
    if(loginForm.valid){
      this._adminService.loginAdmin(this.user).subscribe(
        response =>{
            console.log(response);
        },
        error =>{
           console.log(<any>error);
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
      })
    }
  }

}
