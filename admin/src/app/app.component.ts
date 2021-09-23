import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service';

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
        this.isAuth =  this._adminService.isAuthenticated(['admin']);
      },
      error => {
        console.log(error)
      }
    )
  }
}
