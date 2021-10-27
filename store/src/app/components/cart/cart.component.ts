import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';

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

  constructor(
    private _clientService : ClientService,
    private _router : Router
  ) { 
    this.token = localStorage.getItem('token');
    this.cart = [];
    this.url = global.url;
    this.sub = 0;
    this.total = 0;
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
    this.cart.forEach(element =>{
     this.sub = this.sub + parseInt(element.product.price);
     this.total = this.sub;
    }); 
   }

}
