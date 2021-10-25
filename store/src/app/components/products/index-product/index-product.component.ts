import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
declare var noUiSlider:any;
declare var $ : any;
@Component({
  selector: 'app-index-product',
  templateUrl: './index-product.component.html',
  styleUrls: ['./index-product.component.css']
})
export class IndexProductComponent implements OnInit {

  public config: any;
  public filter_cat;
  public categories:any;
  public products : Array<any> = [];
  public filter_product = '';
  public loader:boolean;
  public url: string;
  public products_in : Array<any> = [];
  public filter_cat_product = 'Todos';
  public route_cat='';
  public page = 1;
  public pageSize = 6;
  public cartData: any;
  public token;
  public loading_btn:boolean;

  public sort_by = 'default';

  constructor(
    private _clientService : ClientService,
    private _iziToastService: IziToastService,
    private _route: ActivatedRoute

  ) { 
    this.config = {};
    this.filter_cat = '';
    this.loader = false;
    this.url = global.url;
    this.cartData = {
      variety: '',
      amount: 1
    };
    this.loading_btn = false;
    this.token = this._clientService.getToken();
  }

  ngOnInit(): void {
    this.slider();
    this.getConfig();
    this.getProducts();
    this._route.params.subscribe(params => {
      this.route_cat = params['category'];
      if(this.route_cat){
        this.filter_cat_product = this.route_cat
      }
    });
  }

  search(){
    this.getProducts()
  }

  getProducts(){
    this.loader = true;
    this._clientService.getProducts(this.filter_product).subscribe(
      response => {
        this.products = response.data;
        this.products_in = response.data;
        this.searchProductCat()
        this.loader = false;
      },
      error =>{
        console.log(error);
        this.loader = false;
      }
    )
  }

  getConfig() {
    this._clientService.getConfig().subscribe(
      response => {
        this.config = response.data;
        this.categories = response.data.categories;
      },
      error => {
        console.log(error)
      }
    );
  }

  search_cat(){
    this.config.categories = this.categories;
    const search = new RegExp(this.filter_cat, 'i');
    this.config.categories = this.config.categories.filter(
      (      item: { title: string; }) => search.test(item.title)
    )
  }


  slider(){
    var slider : any = document.getElementById('slider');
    noUiSlider.create(slider, {
        start: [0, 1000],
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },
        tooltips: [true,true],
        pips: {
          mode: 'count', 
          values: 5,
        }
    })

    slider.noUiSlider.on('update', function (values: any[]) {
        $('.cs-range-slider-value-min').val(values[0]);
        $('.cs-range-slider-value-max').val(values[1]);
    });
    $('.noUi-tooltip').css('font-size','11px');
  }


  search_price(){
    this.products = this.products_in;
    const min = parseInt($('.cs-range-slider-value-min').val());
    const max = parseInt($('.cs-range-slider-value-max').val());
    this.products = this.products.filter((product)=>{
      return product.price >= min &&
        product.price <=max
    })
  }

  searchProductCat(){
    this.products = this.products_in;
    if(this.filter_cat_product == "Todos"){
      this.products = this.products_in;
    }else{
      this.products = this.products.filter(item => item.category ==this.filter_cat_product);
    }
  }

  reset_products(){
    this.filter_product='';
    this.filter_cat_product = 'Todos';
    this.getProducts();
  }

  order_by(){
    
    if(this.sort_by == 'default'){
      this.products = this.products_in;
    }else if(this.sort_by == 'popularity'){
      this.products.sort((a,b) =>{
        if(a.nsales < b.nsales){
          return 1;
        }
        if (a.nsales > b.nsales){
          return -1;
        }
        return 0;
      })
    }else if(this.sort_by == 'des'){
      this.products.sort((a,b) =>{
        if(a.price < b.price){
          return 1;
        }
        if (a.price > b.price){
          return -1;
        }
        return 0;
      })
    }else if(this.sort_by == 'asc'){
      this.products.sort((a,b) =>{
        if(a.price > b.price){
          return 1;
        }
        if (a.price < b.price){
          return -1;
        }
        return 0;
      })
    }else if(this.sort_by == 'az'){
      this.products.sort((a,b) =>{
        if(a.title > b.title){
          return 1;
        }
        if (a.title < b.title){
          return -1;
        }
        return 0;
      })
    }else if(this.sort_by == 'za'){
      this.products.sort((a,b) =>{
        if(a.title < b.title){
          return 1;
        }
        if (a.title > b.title){
          return -1;
        }
        return 0;
      })
    }
  }


  addProduct(product: any) {
    this.loading_btn = true;
    const data = {
      product: product._id,
      amount: 1,
      variety: product.varieties[0]?product.varieties[0].title:'default'
    }
    console.log(data)
    this._clientService.addCart(data,this.token).subscribe(
      response => {
        this._iziToastService.showMsg(response.message, "success");
        this.loading_btn = false;
      },
      error => {
        error.error && this._iziToastService.showMsg(error.error.message, "error");
        this.loading_btn = false;
      }
    )
  }

}
