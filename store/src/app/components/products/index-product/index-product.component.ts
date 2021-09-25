import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
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

  constructor(
    private _clientService : ClientService
  ) { 
    this.config = {};
    this.filter_cat = '';
  }

  ngOnInit(): void {
    this.slider();
    this.getConfig();
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
}
