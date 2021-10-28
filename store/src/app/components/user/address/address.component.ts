import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  public loading_btn:boolean;
  public loader: boolean;

  constructor() { 
    this.loading_btn = false;
    this.loader = true;
  }

  ngOnInit(): void {
  }

}
