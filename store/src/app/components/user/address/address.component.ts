import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public loading_btn:boolean;
  public loader: boolean;
  public address:any;

  constructor() { 
    this.loading_btn = false;
    this.loader = false;
    this.address = {
      principal: false
    }
  }

  ngOnInit(): void {
    this.loading_btn = false;

  }

  register(registerForm:any){
    console.log(registerForm.value);
  }

}
