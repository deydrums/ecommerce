import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';
declare var $:any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  public token;
  public id;
  public userlog:any;
  public config:any;
  public op_cart = false;
  public cart : Array<any>;
  public url: string;


  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.config = {};
    this.cart = [];
    this.url = global.url;

  }

  ngOnInit(): void {
    this.getConfig()
    this.getCart()
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

  getCart(){
    this._clientService.getCart(this.token).subscribe(
      response => {
        this.cart = response.data;
        console.log(this.cart)
      },
      error => {
        console.log(error.error.message)
      }
    )
  }
  getConfig() {
    this._clientService.getConfig().subscribe(
      response => {
        this.config = response.data;
      },
      error => {
        console.log(error)
      }
    );
  }

  op_modal(){
    if(!this.op_cart){
      this.op_cart = true;
      $('#cart').addClass('show');
    }else{
      this.op_cart = false;
      $('#cart').removeClass('show');
    }
  }

}
