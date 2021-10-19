import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { GuestService } from 'src/app/services/guest.service';
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


  constructor(
    private _route: ActivatedRoute,
    private _guestService: GuestService
  ) {
    this.slug = '';
    this.product = [];
    this.url = global.url;

   }

  ngOnInit(): void {

    this._route.params.subscribe(
      params =>{
        this.slug = params['slug'];
        this._guestService.getProductBySlug(this.slug).subscribe(
          response => {
            this.product = response.data;
            console.log(this.product)
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
  }

}
