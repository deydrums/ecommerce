import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

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
    private _iziToastService: IziToastService
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
          const errors = error.error.errors;
          if(errors){
            for (const error in errors) {
              this._iziToastService.showMsg(errors[error].msg, "error");
            }
          }else{
            this._iziToastService.showMsg(error.error.message, "error");
          } 
        }
      );
    }else{
      this._iziToastService.showMsg("Los datos del formulario no son validos", "error");  
    }
  }

}
