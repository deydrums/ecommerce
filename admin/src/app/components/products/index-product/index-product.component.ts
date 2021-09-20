import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {
  
  public loading: boolean;

  constructor() {
    this.loading = true;
   }

  ngOnInit(): void {
  }

}
