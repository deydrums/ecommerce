import { Component, DoCheck, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'admin';
  public isAuth: boolean;

  constructor (
    private _adminService: AdminService,
  ){
    this.isAuth = false;
  }

  ngOnInit(): void {
    this.isAuth =  this._adminService.isAuthenticated(['admin']);
  }

  ngDoCheck(): void {
    this.isAuth =  this._adminService.isAuthenticated(['admin']);
  }
}
