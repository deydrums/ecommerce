import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'admin';
  public isAuth: boolean;
  public token;
  public userLoged:any={};


  constructor (
    private _adminService: AdminService,
    private _router: Router,
    private _iziToastService: IziToastService,

  ){
    this.isAuth = false;
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {
    if(this.token){this.renew(this.token);}
  }

  ngDoCheck(): void {
    this.isAuth =  this._adminService.isAuthenticated(['admin']);
  }

  renew(token:any): void {
    this._adminService.renew(token).subscribe(
      response => {
        this.userLoged=response.data;
        localStorage.setItem('token',response.token);
        localStorage.setItem('_id', response.data._id);
      },
      error => {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        this._iziToastService.showMsg('La sesión ha expirado', 'error');
        this._router.navigate(['/login']);
      }
    )
    this.isAuth =  this._adminService.isAuthenticated(['admin']);
  }
}
