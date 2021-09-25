import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  public token;
  public id;
  public userlog:any;
  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
  }

  ngOnInit(): void {

  }

  ngDoCheck():void {
    if(localStorage.getItem('user_data')){
      this.userlog = JSON.parse(<any>localStorage.getItem('user_data'));
    }else{
      this.userlog = undefined;
    }
  }


  logout(){
    window.location.reload();
    localStorage.clear();
    this._router.navigate(["/"]);
  }

}
