import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { io } from "socket.io-client";

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
  public sub: number;
  public loading_btn:boolean;
  public socket;


  constructor(
    private _clientService : ClientService,
    private _router : Router,
    private _iziToastService : IziToastService,
  ) { 
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('_id');
    this.config = {};
    this.cart = [];
    this.url = global.url;
    this.sub = 0;
    this.loading_btn = false;
    this.socket = io(global.url_backend);
  }

  ngOnInit(): void {
    this.getConfig()
    this.getCart()
    this.socket.on('new-cart', this.getCart.bind(this));
    this.socket.on('new-cart-add', this.getCart.bind(this));

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
        this.calcCart();
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

  calcCart(){
    this.sub = 0;
   this.cart.forEach(element =>{
    this.sub = this.sub + parseInt(element.product.price);
   }); 
  }

  removeProduct(id:any){
    this.loading_btn = true;
    this._clientService.deleteCart(id,this.token).subscribe(
      response => {
        this._iziToastService.showMsg(response.message,'success')
        this.socket.emit('delete-cart',{data:response.data});
        this.loading_btn = false;
      },
      error => {
        this._iziToastService.showMsg(error.error.message,'error')
        this.loading_btn = false;
      }
    )
  }


}
