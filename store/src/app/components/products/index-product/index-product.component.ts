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
  constructor(
    private _clientService : ClientService
  ) { 
    this.config = {};
  }

  ngOnInit(): void {

    this.getConfig();

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


  getConfig() {
    this._clientService.getConfig().subscribe(
      response => {

        this.config = response.data;
        console.log(this.config)
      },
      error => {
        console.log(error)
      }
    );
  }
}
