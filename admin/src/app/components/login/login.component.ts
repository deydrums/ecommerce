import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public userLoged:any={};
  public token: any ='';
  constructor( 
    private _adminService: AdminService,
    private _router: Router,
    ) { 
      this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){
      this._router.navigate(['/']);
    }else{
      //Mantener en el componente
    }
    
  }

  login(loginForm:any){
    if(loginForm.valid){
      this._adminService.loginAdmin(this.user).subscribe(
        response =>{
          this.userLoged=response.data;
          localStorage.setItem('token',response.token);
          localStorage.setItem('_id', response.data._id);
          this._router.navigate(['/']);
        },
        error =>{          
          iziToast.show({
            title: 'Error',
            titleColor: '#ff0000',
            color: '#fff',
            class: 'text-danger',
            position: 'topRight',
            message: error.error.message
          })
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
