import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { global } from 'src/app/services/global';
import { GuestService } from 'src/app/services/guest.service';
import { IziToastService } from 'src/app/services/helpers/izi-toast.service';
declare var tns:any;
declare var lightGallery:any;

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  public slug:string;
  public product: any;
  public url: string;
  public recProducts: Array<any>;
  public cartData: any;
  public token: any;
  public loading_btn:boolean;



  constructor(
    private _route: ActivatedRoute,
    private _guestService: GuestService,
    private _iziToastService: IziToastService,
    private _clientService : ClientService
  ) {
    this.slug = '';
    this.token = this._clientService.getToken();
    this.product = [];
    this.url = global.url;
    this.recProducts = [];
    this.cartData = {
      variety: '',
      amount: 1
    };
    this.loading_btn = false;

   }

  ngOnInit(): void {

    this._route.params.subscribe(
      params =>{
        this.slug = params['slug'];
        this._guestService.getProductBySlug(this.slug).subscribe(
          response => {
            this.product = response.data;
            this._guestService.getRecommendedProducts(this.product.category).subscribe(
              response => {
                this.recProducts = response.data;
              },
              error => {
                console.log(error)
              }
            )
          },
          error => {
            console.log(error)
          }
        )
      }
    )

    this.startTns();

  }

  startTns(): void {

    setTimeout(() => {
      tns({
        container: '.cs-carousel-inner',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        navContainer: "#cs-thumbnails",
        navAsThumbnails: true,
        gutter: 15,
      });

      var e = document.querySelectorAll(".cs-gallery");
      if (e.length){
        for (var t = 0; t < e.length; t++){
          lightGallery(e[t], { selector: ".cs-gallery-item", download: !1, videojs: !0, youtubePlayerParams: { modestbranding: 1, showinfo: 0, rel: 0 }, vimeoPlayerParams: { byline: 0, portrait: 0 } });
        }
      }


      tns({
        container: '.cs-carousel-inner-two',
        controlsText: ['<i class="cxi-arrow-left"></i>', '<i class="cxi-arrow-right"></i>'],
        navPosition: "top",
        controlsPosition: "top",
        mouseDrag: !0,
        speed: 600,
        autoplayHoverPause: !0,
        autoplayButtonOutput: !1,
        nav: false,
        controlsContainer: "#custom-controls-related",
        responsive: {
          0: {
            items: 1,
            gutter: 20
          },
          480: {
            items: 2,
            gutter: 24
          },
          700: {
            items: 3,
            gutter: 24
          },
          1100: {
            items: 4,
            gutter: 30
          }
        }
      });


  
    },1000)


  }

  addProduct() {
    this.loading_btn = true;
    if(this.cartData.variety){
      if(this.cartData.amount <= this.product.stock){
        const data = {
          product: this.product._id,
          amount: this.cartData.amount,
          variety: this.cartData.variety
        }
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
      }else{
        this._iziToastService.showMsg("La cantidad disponible es " + this.product.stock, "error");
        this.loading_btn = false;
      }
    }else{
      this._iziToastService.showMsg("Selecciona una "+this.product.title_variety, "error");
      this.loading_btn = false;
    }
  }

}
