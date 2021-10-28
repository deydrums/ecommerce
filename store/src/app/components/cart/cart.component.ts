import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
import { io } from "socket.io-client";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public token;
  public userlog:any;
  public op_cart = false;
  public cart : Array<any>;
  public url: string;
  public sub: number;
  public total: number;
  public loading_btn:boolean;
  public socket;

  constructor(
    private _clientService : ClientService,
    private _router : Router,
    private _iziToastService : IziToastService,
  ) { 
    this.token = localStorage.getItem('token');
    this.cart = [];
    this.url = global.url;
    this.sub = 0;
    this.total = 0;
    this.loading_btn = false;
    this.socket = io(global.url_backend);
  }

  ngOnInit(): void {
    this.getCart();
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

  calcCart(){
    this.sub = 0;
    this.cart.forEach(element =>{
     this.sub = this.sub + parseInt(element.product.price);
     this.total = this.sub;
    }); 
   }


   removeProduct(id:any){
    this.loading_btn = true;
    this._clientService.deleteCart(id,this.token).subscribe(
      response => {
        this._iziToastService.showMsg(response.message,'success')
        this.loading_btn = false;
        this.socket.emit('delete-cart',{data:response.data});
        this.getCart();
      },
      error => {
        this._iziToastService.showMsg(error.error.message,'error')
        this.loading_btn = false;
      }
    )
  }

}
